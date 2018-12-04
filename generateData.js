/**
 * Generates 2D sin() wave with noise.
 * 
 * @param {number} width 
 * @param {number} height 
 */
function generateData(width, height) {
  const data = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(
        Math.random()
        * (1 + Math.sin(i / 6))
        * (1 + Math.sin(j / 6))
      );
    }
    data.push(row);
  }
  return data;
}
