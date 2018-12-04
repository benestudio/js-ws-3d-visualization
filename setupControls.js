function setupControls(camera, renderer) {
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.25;

  controls.screenSpacePanning = false;

  controls.minDistance = 10;
  controls.maxDistance = 500;
  controls.autoRotateSpeed = 200;

  controls.rotateSpeed = .25;
  controls.panSpeed = .25;

  controls.maxPolarAngle = Math.PI / 2;

  return controls;
}
