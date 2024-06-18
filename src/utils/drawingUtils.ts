export const drawHex = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hexSize: number
) => {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i; // No rotation needed for flat-topped hexagons
    const x_i = x + hexSize * Math.cos(angle);
    const y_i = y + hexSize * Math.sin(angle);
    ctx.lineTo(x_i, y_i);
  }
  ctx.closePath();
  ctx.stroke();
};

export const drawHexCoordinates = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  col: number,
  row: number,
  hexSize: number
) => {
  ctx.font = "10px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const text = `(${col}, ${row})`;
  ctx.fillStyle = "black";
  ctx.fillText(text, x, y);
};

export const drawBlueCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hexSize: number
) => {
  ctx.beginPath();
  ctx.arc(x, y, hexSize / 4, 0, 2 * Math.PI);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.strokeStyle = "blue";
  ctx.stroke();
};

export const drawImageOnLoad = (
  ctx: CanvasRenderingContext2D,
  image: {
    url: string;
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
  },
  centerX: number,
  centerY: number,
  callback: () => void
) => {
  const img = new Image();
  img.src = image.url;
  img.onload = () => {
    const imgX = centerX - image.width / 2 + (image.offsetX || 0);
    const imgY = centerY - image.height / 2 + (image.offsetY || 0);
    ctx.drawImage(img, imgX, imgY, image.width, image.height);
    callback();
  };
};
