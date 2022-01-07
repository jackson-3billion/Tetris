export const fixDpi = (canvas) => {
  //const dpi = window.devicePixelRatio;
  const style_height = +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
  const style_width = +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);

  canvas.setAttribute('height', style_height);
  canvas.setAttribute('width', style_width);
};
