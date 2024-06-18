// src/HexGrid.tsx
import React, { useRef, useEffect } from "react";

const HexGrid = ({
  width,
  height,
  hexSize,
}: {
  width: number;
  height: number;
  hexSize: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;

    const drawHex = (x: number, y: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 2; // Adding Math.PI / 2 to rotate by 90 degrees
        const x_i = x + hexSize * Math.cos(angle);
        const y_i = y + hexSize * Math.sin(angle);
        ctx.lineTo(x_i, y_i);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawHexGrid = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const cols = Math.ceil(canvasWidth / hexWidth);
      const rows = Math.ceil(canvasHeight / (hexHeight * 0.75));

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth + ((row % 2) * hexWidth) / 2;
          const y = row * (hexHeight * 0.75);
          drawHex(x, y);
          drawHexCoordinates(x, y, col, row);
        }
      }
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
      ctx.fillText(text, x, y + hexSize / 2);
    };

    drawHexGrid();
  }, [hexSize]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default HexGrid;
