(async () => {
  // Image sources: https://geoportal.budapest.hu/Kornyezetvedelem/ZAJ/2007/Bp/

  const config = {
    baseMapUrl: 'https://i.imgur.com/E8vbaRC.png',
    dataMapUrl: 'https://i.imgur.com/MtBe8P6.png',
    width: 100,
    height: 100,
    dataDepth: 10,
  };

  const dataVisualizer = new DataVisualizer(config);
  await dataVisualizer.init();

  console.log('dataVisualizer initialized!');

})();
