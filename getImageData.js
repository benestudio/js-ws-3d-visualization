/**
 * @param resolution Resolution should be <= 1. If less than 1 then data will be sparse.
 */
async function getImageData(src, resolution = 1) {
  const data = [];
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  return new Promise(resolve => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const jStep = 1 / resolution;
      const iStep = 1 / resolution;
      // data: array of rows
      for (let j = 0; j < img.height; j += jStep) {
        const row = [];
        for (let i = 0; i < img.width; i += iStep) {
          // RGBA
          const pixelData = ctx.getImageData(i, j, 1, 1).data;
          row.push(pixelData);
        }
        data.push(row);
      }
      resolve(data);
    };
    img.src = src;    
  });
}
