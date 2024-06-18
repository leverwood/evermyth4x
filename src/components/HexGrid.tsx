import { useRef, useEffect } from "react";
import {
  drawHex,
  drawHexCoordinates,
  drawBlueCircle,
  drawImageOnLoad,
} from "../utils/drawingUtils";

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

    const drawHexGrid = () => {
      // clear the whole grid
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // Draw background image
      drawImageOnLoad(ctx, image, centerX, centerY, () => {
        // Calculate the number of hexes to draw
        const cols = Math.ceil(canvasWidth / (hexWidth * 0.75));
        const rows = Math.ceil(canvasHeight / hexHeight);

        for (let row = -rows; row < rows; row++) {
          for (let col = -cols; col < cols; col++) {
            const x = centerX + col * (hexWidth * 0.75);
            const y = centerY + row * hexHeight + (col % 2) * (hexHeight / 2);
            drawHex(ctx, x, y, hexSize);
            drawHexCoordinates(ctx, x, y, col, row, hexSize);
          }
        }

        // Draw blue circles at specified coordinates
        coordinates.forEach(({ col, row }) => {
          const x = centerX + col * (hexWidth * 0.75);
          const y = centerY + row * hexHeight + (col % 2) * (hexHeight / 2);
          drawBlueCircle(ctx, x, y, hexSize);
        });
      });
    };

    drawHexGrid();
  }, [coordinates, hexSize, image]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default HexGrid;
