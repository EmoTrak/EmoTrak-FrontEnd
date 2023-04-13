import { useCallback, useState } from "react";
import { Coordinate } from "../../../data/type/d3";

interface PenProps {
  ref?: React.RefObject<HTMLCanvasElement>;
  action?(): Function;
  color?: string;
  penSize?: number;
}

export const usePen = (
  ref: React.RefObject<HTMLCanvasElement>,
  action: Function,
  color: string,
  penSize: number
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
      context.lineWidth = penSize;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startTouch = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      if (!ref.current) {
        return;
      }
      // setIsPainting(true);
      const canvas: HTMLCanvasElement = ref.current;
      let touch = event.touches[0];
      let mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    },
    []
  );

  const moveTouch = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      event.stopPropagation(); // prevent drag

      if (!ref.current) {
        return;
      }
      const canvas: HTMLCanvasElement = ref.current;
      let touch = event.touches[0];
      let mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    },
    []
  );

  const endTouch = useCallback((event: React.TouchEvent<HTMLCanvasElement>) => {
    // setIsPainting(false);
    event.preventDefault();
    event.stopPropagation(); // prevent drag

    if (!ref.current) {
      return;
    }
    const canvas: HTMLCanvasElement = ref.current;
    let touch = event.touches[0];
    let mouseUpEvent = new MouseEvent("mouseup", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    let mouseLeaveEvent = new MouseEvent("mouseleave", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseUpEvent);
    canvas.dispatchEvent(mouseLeaveEvent);
    // setIsErasing(false);
  }, []);

  const startPaint = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>): void => {
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
    (event: React.MouseEvent<HTMLCanvasElement>): void => {
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

  const exitPaint = useCallback((): void => {
    setIsPainting(false);
    // setIsErasing(false);
  }, []);

  return { startPaint, paint, exitPaint, endTouch, startTouch, moveTouch };
};
