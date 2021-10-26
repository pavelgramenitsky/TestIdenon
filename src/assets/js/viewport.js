const getOrientation = () => {
  if (window.matchMedia("(orientation: landscape)").matches) return { landscape: true, text: "landscape" };
  if (window.matchMedia("(orientation: portrait)").matches) return { portrait: true, text: "portrait" };
};

const resizeViewport = (config) => {
  const viewport = document.getElementById("viewport");
  const viewportWrapper = document.getElementById("viewport-wrapper");

  const scaleHeight = 1 + 0.01 * ((100 / config.HEIGHT) * (viewportWrapper.offsetHeight - config.HEIGHT));
  const scaleWidth = 1 + 0.01 * ((100 / config.WIDTH) * (viewportWrapper.offsetWidth - config.WIDTH));

  const top = (viewportWrapper.offsetHeight - config.HEIGHT * scaleWidth) / 2;
  const left = (viewportWrapper.offsetWidth - config.WIDTH * scaleHeight) / 2;

  viewport.style = `
    transform: scale(${scaleHeight > scaleWidth ? scaleWidth.toFixed(3) : scaleHeight.toFixed(3)});
    top: ${top <= 0 ? 0 : top}px;
    left: ${left <= 0 ? 0 : left}px;
    display: block
  `;
};

const handleResize = (config) => {
  let resizeTimeout;
  resizeViewport(config);

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeViewport(config);
    }, 500);
  }, false);
}

export { getOrientation, handleResize };