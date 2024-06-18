import { useRef, useEffect } from "react";

const HexGrid = ({
  width,
  height,
  hexSize,
  coordinates,
}: {
  width: number;
  height: number;
  hexSize: number;
  coordinates: {
    col: number;
    row: number;
    drawCircle?: boolean;
    imageSrc?: string;
  }[];
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
      ctx.strokeStyle = "black";
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
      // clear the whole grid
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // Calculate the number of hexes to draw
      const cols = Math.ceil(canvasWidth / hexWidth);
      const rows = Math.ceil(canvasHeight / (hexHeight * 0.75));

      for (let row = -rows; row < rows; row++) {
        for (let col = -cols; col < cols; col++) {
          const x = centerX + col * hexWidth + ((row % 2) * hexWidth) / 2;
          const y = centerY + row * (hexHeight * 0.75);
          drawHex(x, y);
          drawHexCoordinates(x, y, col, row);
        }
      }

      // Draw blue circles and images at specified coordinates
      coordinates.forEach(({ col, row, drawCircle, imageSrc }) => {
        const x = centerX + col * hexWidth + ((row % 2) * hexWidth) / 2;
        const y = centerY + row * (hexHeight * 0.75);

        if (imageSrc) {
          drawHexBackgroundImage(x, y, imageSrc);
        }

        if (drawCircle) {
          drawBlueCircle(x, y);
        }
      });
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
      ctx.fillText(text, x, y + hexSize / 2);
    };

    const drawBlueCircle = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, hexSize / 4, 0, 2 * Math.PI);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.strokeStyle = "blue";
      ctx.stroke();
    };

    const drawHexBackgroundImage = (x: number, y: number, imageSrc: string) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const pattern = ctx.createPattern(img, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + Math.PI / 2;
            const x_i = x + hexSize * Math.cos(angle);
            const y_i = y + hexSize * Math.sin(angle);
            ctx.lineTo(x_i, y_i);
          }
          ctx.closePath();
          ctx.fill();
        }
      };
    };

    drawHexGrid();
  }, [coordinates, hexSize, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default HexGrid;
