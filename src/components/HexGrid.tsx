import { useRef, useEffect, useState } from "react";
import {
  drawRevealedHex,
  drawHexCoordinates,
  drawText,
  drawImageOnLoad,
  fillInHex,
} from "../utils/drawingUtils";
import { getHexAtMousePosition } from "../utils/interactionUtils";
import { useHexContext } from "./HexContext";

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
  coordinates: {
    col: number;
    row: number;
    revealed?: boolean;
    owned?: boolean;
    text?: string;
  }[];
  image: {
    url: string;
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
  };
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { hoveredHex, setHoveredHex } = useHexContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hexWidth = 2 * hexSize;
    const hexHeight = Math.sqrt(3) * hexSize;

    const drawHexGrid = () => {
      // clear the whole grid
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      // Draw background image
      drawImageOnLoad(ctx, image, centerX, centerY, () => {
        // Calculate the number of hexes to draw
        const cols = Math.ceil(canvasWidth / (hexWidth * 0.75));
        const rows = Math.ceil(canvasHeight / hexHeight);

        const loopHexes = (
          callback: ({
            x,
            y,
            col,
            row,
            coordData,
          }: {
            x: number;
            y: number;
            col: number;
            row: number;
            isHovered: boolean;
            coordData?: {
              col: number;
              row: number;
              revealed?: boolean;
              owned?: boolean;
              text?: string;
            };
          }) => void
        ) => {
          for (let row = -rows; row < rows; row++) {
            for (let col = -cols; col < cols; col++) {
              const x = centerX + col * (hexWidth * 0.75);
              const y = centerY + row * hexHeight + (col % 2) * (hexHeight / 2);
              const coordData = coordinates.find(
                ({ col: c, row: r }) => col === c && row === r
              );
              const isHovered =
                hoveredHex?.col === col && hoveredHex?.row === row;
              callback({ x, y, col, row, coordData, isHovered });
            }
          }
        };

        loopHexes(({ x, y, col, row, coordData, isHovered }) => {
          // pass doFill as false when the coordinates are revealed
          if (!coordData?.revealed && !isHovered) {
            fillInHex(ctx, x, y, hexSize);
          }
          drawHexCoordinates(ctx, x, y, col, row, hexSize);
        });

        loopHexes(({ x, y, col, row, coordData }) => {
          if (!coordData?.revealed) return;
          drawRevealedHex(ctx, x, y, hexSize, !!coordData.owned);
          drawHexCoordinates(ctx, x, y, col, row, hexSize);
        });

        loopHexes(({ x, y, col, row, coordData }) => {
          if (coordData?.text) {
            drawText(ctx, x, y, hexSize, coordData.text);
          }
        });
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { col, row } = getHexAtMousePosition(
        canvas,
        event.clientX,
        event.clientY,
        hexSize
      );
      setHoveredHex({ col, row });
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    drawHexGrid();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [coordinates, hexSize, hoveredHex?.col, hoveredHex?.row, image]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default HexGrid;
