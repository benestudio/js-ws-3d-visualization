class DataVisualizer {
  constructor({
    baseMapUrl,
    dataMapUrl,
    width,
    height,
    dataDepth,
  }) {
    if (
      !baseMapUrl
      || !dataMapUrl
      || !width
      || !height
      || !dataDepth
    ) {
      throw new Error('missing param');
    }
    this.baseMapUrl = baseMapUrl;
    this.dataMapUrl = dataMapUrl;
    this.width = width;
    this.height = height;
    this.dataDepth = dataDepth;
  }

  async init() {
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 50, 50);
    
      var renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
    
      var lights = [];
      lights[0] = new THREE.PointLight(0xffffff, .5, 0);
      lights[1] = new THREE.PointLight(0xffffff, .5, 0);
      lights[2] = new THREE.PointLight(0xffffff, .5, 0);
    
      lights[0].position.set(0, 200, 0);
      lights[1].position.set(100, 200, 100);
      lights[2].position.set(- 100, - 200, - 100);
    
      scene.add(lights[0]);
      scene.add(lights[1]);
      scene.add(lights[2]);
    
      const imageData = await getImageData(this.dataMapUrl, .25);
    
      function f(x) {
        // return Math.log10(x*1000)/10;
        return Math.max(0, Math.min(1, Math.exp(x * 2) / 2.2 - 1));
      }
    
      function threshold(x, tres = 0.05) {
        return x < tres ? undefined : x;
      }
    
      // get only red color components since the image is greyscale
      const data = imageData.map(
        row => row.map(
          ([r, g, b, a]) => threshold(f((255 - r) / 255), 0.1)
        )
      );
    
      // create a palette of 10 different materials
      const materials = createMaterialPalette(10)
    
      var singleGeometry = new THREE.Geometry();
    
      const dataWidth = data.length;
      const dataHeight = !data[0] ? 0 : data[0].length;
    
      for (let j = 0; j < data.length; j++) {
        const row = data[j];
        for (let i = 0; i < row.length; i++) {
          const value = row[i];
          if (value !== undefined) {
            var box = new THREE.BoxGeometry(1, 1, 1);
            var cube = new THREE.Mesh(box);
            cube.applyMatrix(new THREE.Matrix4().makeTranslation(.01 + i - row.length / 2, 0.5, .01 + j - data.length / 2));
            cube.applyMatrix(new THREE.Matrix4().makeScale(this.width / dataWidth, value * this.dataDepth, this.height / dataHeight));
            //cube.updateMatrix();
            for ( var k = 0; k < box.faces.length; k++ ) {
              box.faces[k].materialIndex = Math.floor(value * (materials.length - 1));
            }
            singleGeometry.merge(cube.geometry, cube.matrix);
          }
        }
      }
    
      var map = createMap({ width: this.width, height: this.height, url: this.baseMapUrl });
      scene.add(map);
    
      var mesh = new THREE.Mesh(singleGeometry, materials);
      scene.add(mesh);
    
      // setup mouse controls
      const controls = setupControls(camera, renderer);
    
      var animate = function () {
        requestAnimationFrame(animate);
    
        // trigger event to update controls
        controls.update();
    
        renderer.render(scene, camera);
      };
    
      animate();
    
      window.addEventListener('resize', onWindowResize, false);
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
  }
}
