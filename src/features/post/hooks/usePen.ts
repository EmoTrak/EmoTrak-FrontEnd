import { useState } from "react";
import { Coordinate } from "../../../data/type/type";

export const usePen = (
  ref: React.RefObject<HTMLCanvasElement>,
  action: (event: MouseEvent) => Coordinate | undefined,
  color: string,
  penSize: number,
  mouse: Coordinate | undefined,
  setMouse: React.Dispatch<React.SetStateAction<Coordinate | undefined>>
) => {
  const [isPainting, setIsPainting] = useState<boolean>(false);

  // canvas에 선긋는 함수
  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
    color: string
  ) => {
    if (ref.current) {
      const canvas: HTMLCanvasElement = ref.current;
      const context = canvas.getContext("2d");

      if (context) {
        context.strokeStyle = `${color}`;
        context.lineJoin = "round";
        context.lineWidth = penSize;

        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();

        context.stroke();
      }
    }
  };

  const startPaint = (event: MouseEvent) => {
    const coordinates = action(event);
    if (coordinates) {
      setIsPainting(true);
      setMouse(coordinates);
    }
  };

  const paint = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isPainting) {
      const newMousePosition = action(event);
      if (mouse && newMousePosition) {
        drawLine(mouse, newMousePosition, color);
        setMouse(newMousePosition);
      }
    }
  };

  const exitPaint = () => {
    setIsPainting(false);
  };

  return {
    startPaint,
    paint,
    exitPaint,
    isPainting,
  };
};
