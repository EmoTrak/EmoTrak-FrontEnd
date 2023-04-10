import { useCallback, useState } from "react";
import { Coordinate } from "../../../data/type/d3";

export const usePen = (
  ref: React.RefObject<HTMLCanvasElement>,
  action: Function,
  color: string
) => {
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [mousePosition, setMousePosition] =
    useState<Coordinate | undefined>(undefined);
  // canvas에 선긋는 함수
  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
    color: string
  ) => {
    if (!ref.current) {
      return;
    }
    const canvas: HTMLCanvasElement = ref.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.strokeStyle = `${color}`;
      context.lineJoin = "round";
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const coordinates = action(event);
      if (coordinates) {
        setIsPainting(true);
        // setIsErasing(false);
        setMousePosition(coordinates);
      }
    },
    []
  );

  const paint = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      event.preventDefault(); // prevent drag
      event.stopPropagation(); // prevent drag

      if (isPainting) {
        const newMousePosition = action(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition, color);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    // setIsErasing(false);
  }, []);

  return { startPaint, paint, exitPaint };
};
