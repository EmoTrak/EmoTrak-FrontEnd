import { useCallback, useState } from "react";
import { Coordinate } from "../../../data/type/type";

export const useEraser = (
  ref: React.RefObject<HTMLCanvasElement>,
  action: (event: MouseEvent) => Coordinate | undefined,
  mouse: Coordinate | undefined,
  setMouse: React.Dispatch<React.SetStateAction<Coordinate | undefined>>
) => {
  const [isErasing, setIsErasing] = useState<boolean>(false);

  // canvas에 선긋는 함수
  const eraseLine = (originalMousePosition: Coordinate) => {
    if (ref.current) {
      const canvas: HTMLCanvasElement = ref.current;
      const context = canvas.getContext("2d");

      if (context) {
        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.clearRect(
          originalMousePosition.x - 15,
          originalMousePosition.y - 15,
          30,
          30
        );
        context.closePath();
      }
    }
  };

  const startErase = useCallback((event: MouseEvent) => {
    const coordinates = action(event);
    if (coordinates) {
      setIsErasing(true);
      setMouse(coordinates);
    }
  }, []);

  const erase = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isErasing) {
        const newMousePosition = action(event);
        if (mouse && newMousePosition) {
          eraseLine(mouse);
          setMouse(newMousePosition);
        }
      }
    },
    [isErasing, mouse]
  );

  const exitErase = useCallback(() => {
    setIsErasing(false);
  }, []);

  return { startErase, erase, exitErase, isErasing };
};
