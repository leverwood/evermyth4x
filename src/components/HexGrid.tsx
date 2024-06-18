import { useRef, useEffect } from "react";

const HexGrid = ({
  width,
  height,
  hexSize,
  coordinates,
  image,
}: {
  width: number;
  height: number;
  hexSize: number;
  coordinates: { col: number; row: number }[];
  image: {
    url: string;
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
  };
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hexWidth = 2 * hexSize;
    const hexHeight = Math.sqrt(3) * hexSize;

    const drawHex = (x: number, y: number) => {
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

    const drawHexGrid = () => {
      // clear the whole grid
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // Draw background image
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        const imgX = centerX - image.width / 2;
        const imgY = centerY - image.height / 2 + (image.offsetY || 0);
        ctx.drawImage(img, imgX, imgY, image.width, image.height);

        // Calculate the number of hexes to draw
        const cols = Math.ceil(canvasWidth / (hexWidth * 0.75));
        const rows = Math.ceil(canvasHeight / hexHeight);

        for (let row = -rows; row < rows; row++) {
          for (let col = -cols; col < cols; col++) {
            const x = centerX + col * (hexWidth * 0.75);
            const y = centerY + row * hexHeight + (col % 2) * (hexHeight / 2);
            drawHex(x, y);
            drawHexCoordinates(x, y, col, row);
          }
        }

        // Draw blue circles at specified coordinates
        coordinates.forEach(({ col, row }) => {
          const x = centerX + col * (hexWidth * 0.75);
          const y = centerY + row * hexHeight + (col % 2) * (hexHeight / 2);
          drawBlueCircle(x, y);
        });
      };
    };

    const drawHexCoordinates = (
      x: number,
      y: number,
      col: number,
      row: number
    ) => {
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const text = `(${col}, ${row})`;
      ctx.fillStyle = "black";
      ctx.fillText(text, x, y);
    };

    const drawBlueCircle = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, hexSize / 4, 0, 2 * Math.PI);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.strokeStyle = "blue";
      ctx.stroke();
    };

    drawHexGrid();
  }, [coordinates, hexSize, image]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default HexGrid;
