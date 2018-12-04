/**
 * 
 * @param {number} component Shold be in the range [0, 1] inclusive.
 */
function orangeColorFactory(component) {
  const colorComponent = Math.floor(255 * component);
  return new THREE.Color(`rgb(255, ${255 - colorComponent}, 0)`);
}

function createMaterialPalette(count, colorFactory = orangeColorFactory) {
  // JS way of creating an array of incrementing integers: 1,2,3,...
  return [...new Array(count)].map(
    (_, i) => {
      const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
      material.color = colorFactory(i / count);
      return material;
    }
  );
}