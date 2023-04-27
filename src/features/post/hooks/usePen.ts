import { useCallback, useState } from "react";
import { Coordinate } from "../../../data/type/type";

export const usePen = (
  ref: React.RefObject<HTMLCanvasElement>,
  action: Function,
  color: string,
  penSize: number
) => {
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

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

  const startPaint = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const coordinates: Coordinate = action(event);
      if (coordinates) {
        setIsPainting(true);
        setMousePosition(coordinates);
      }
    },
    []
  );

  const paint = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      event.stopPropagation();

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
  }, []);

  const startTouch = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      if (!ref.current) {
        return;
      }
      const canvas: HTMLCanvasElement = ref.current;
      if (event.touches.length === 0) {
        return;
      }
      let touch = event.touches[0];
      let mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
        button: 0,
      });
      canvas.dispatchEvent(mouseEvent);
    },
    []
  );

  const moveTouch = useCallback(
    (event: React.TouchEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!ref.current) {
        return;
      }
      const canvas: HTMLCanvasElement = ref.current;
      if (event.touches.length === 0) {
        return;
      }
      let touch = event.touches[0];
      let mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
        button: 0,
      });
      canvas.dispatchEvent(mouseEvent);
    },
    []
  );

  const endTouch = useCallback((event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!ref.current) {
      return;
    }
    const canvas: HTMLCanvasElement = ref.current;
    if (event.touches.length === 0) {
      return;
    }
    let touch = event.touches[0];
    let mouseUpEvent = new MouseEvent("mouseup", {
      clientX: touch.clientX,
      clientY: touch.clientY,
      button: 0,
    });
    let mouseLeaveEvent = new MouseEvent("mouseleave", {
      clientX: touch.clientX,
      clientY: touch.clientY,
      button: 0,
    });
    canvas.dispatchEvent(mouseUpEvent);
    canvas.dispatchEvent(mouseLeaveEvent);
  }, []);

  return {
    startPaint,
    paint,
    exitPaint,
    endTouch,
    startTouch,
    moveTouch,
  };
};
