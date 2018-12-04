/**
 * @returns Returns map as a Mesh.
 */
function createMap({ width, height, url }) {
  if (!width || !height || !url) {
    throw new Error('missing parameter');
  }
  var planeGeometry = new THREE.PlaneGeometry(width, height, 10, 10);
  var texture = new THREE.TextureLoader().load(url);
  texture.anisotropy = 10;
  var planeMaterial = new THREE.MeshPhongMaterial({ map: texture });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, -0.1, 0);
  return plane;
}
