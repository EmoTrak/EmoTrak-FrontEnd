import { useCallback, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillEraserFill, BsFillTrash3Fill } from "react-icons/bs";
import { themeColor } from "../../../utils/theme";
import { Coordinate } from "../../../data/type/type";
import { usePen } from "../hooks/usePen";
import { useEraser } from "../hooks/useEraser";
import PenTool from "./PenTool";
import Palette from "./Palette";
import * as St from "../styles/DrawingStyle";
import { useWindowSize } from "../../../hooks/useWindowSize";

interface CanvasProps {
  isCanvas: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  validation: React.Dispatch<React.SetStateAction<boolean>>;
}

const Canvas = ({ isCanvas, canvasRef, validation }: CanvasProps) => {
  const { desktop, tablet, mobile } = useWindowSize();
  const canvasHeight = desktop ? 550 : tablet ? 500 : mobile ? 340 : 320;

  const canvasWidth = desktop ? 580 : tablet ? 430 : mobile ? 450 : 320;

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  // 좌표 함수
  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const rect = canvas.getBoundingClientRect(); // 캔버스의 뷰포트 상의 위치 정보를 가져옴
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  };

  // 그림판 모드, 색깔 상태 관리
  const [mode, setMode] = useState<string>("pen");
  const [selectedColor, setSelectedColor] = useState<string>(
    themeColor.main.black
  );
  const [selectPen, setSelectPen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<number>(3);
  // 지우개, 펜 모드 변경 함수
  const switchModeHandler = (item: string) => {
    setMode(item);
    if (item === "pen") {
      setSelectPen((pre) => !pre);
    }
  };
  // 색깔 변경 함수
  const selectColorHandler = (color: string) => {
    setSelectedColor(color);
  };

  const selectPenSizeHandler = (size: number) => {
    setSelectedSize(size);
  };

  const { startPaint, paint, exitPaint, isPainting } = usePen(
    canvasRef,
    getCoordinates,
    selectedColor,
    selectedSize,
    mousePosition,
    setMousePosition
  );

  const { startErase, erase, exitErase, isErasing } = useEraser(
    canvasRef,
    getCoordinates,
    mousePosition,
    setMousePosition
  );
  // 캔버스 비우기
  const clearCanvas = () => {
    if (window.confirm("그린 내용이 사라집니다!")) {
      if (canvasRef.current) {
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.getContext("2d")!!.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };
  // useEffect + AddEventListener 대체 함수
  const mouseDownHandler = (event: MouseEvent) => {
    const mouseDown = new Map([
      [
        "pen",
        () => {
          startPaint(event);
          setSelectPen(false);
        },
      ],
      [
        "eraser",
        () => {
          startErase(event);
          setSelectPen(false);
        },
      ],
    ]);
    const mousefunc = mouseDown.get(mode);

    return mousefunc && mousefunc();
  };

  const mouseMoveHandler = useCallback(
    (event: MouseEvent) => {
      const mouseMove = new Map([
        [
          "pen",
          () => {
            paint(event);
            validation(false);
          },
        ],
        [
          "eraser",
          () => {
            erase(event);
            validation(false);
          },
        ],
      ]);
      const mousefunc = mouseMove.get(mode);

      return mousefunc && mousefunc();
    },
    [mousePosition, isPainting, isErasing]
  );

  const mouseUpHandler = () => {
    const mouseUp = new Map([
      ["pen", () => exitPaint()],
      ["eraser", () => exitErase()],
    ]);
    const mousefunc = mouseUp.get(mode);

    return mousefunc && mousefunc();
  };

  const mouseLeaveHandler = () => {
    const mouseLeave = new Map([
      ["pen", () => exitPaint()],
      ["eraser", () => exitErase()],
    ]);
    const mousefunc = mouseLeave.get(mode);

    return mousefunc && mousefunc();
  };

  const startTouch = useCallback((event: TouchEvent) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    let touch = event.touches[0];

    let mouseEvent = new MouseEvent("mousedown", {
      clientX: touch?.clientX,
      clientY: touch?.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  }, []);

  const moveTouch = useCallback((event: TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    let touch = event.touches[0];
    let mouseEvent = new MouseEvent("mousemove", {
      clientX: touch?.clientX,
      clientY: touch?.clientY,
    });

    canvas.dispatchEvent(mouseEvent);
  }, []);

  const endTouch = useCallback((event: TouchEvent) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    let touch = event.touches[0];
    let mouseUpEvent = new MouseEvent("mouseup", {
      clientX: touch?.clientX,
      clientY: touch?.clientY,
    });
    let mouseLeaveEvent = new MouseEvent("mouseleave", {
      clientX: touch?.clientX,
      clientY: touch?.clientY,
    });
    canvas.dispatchEvent(mouseUpEvent);
    canvas.dispatchEvent(mouseLeaveEvent);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener("mousedown", mouseDownHandler);
    canvas.addEventListener("mousemove", mouseMoveHandler);
    canvas.addEventListener("mouseup", mouseUpHandler);
    canvas.addEventListener("mouseleave", mouseLeaveHandler);
    canvas.addEventListener("touchstart", startTouch);
    canvas.addEventListener("touchmove", moveTouch);
    canvas.addEventListener("touchend", endTouch);

    return () => {
      canvas.removeEventListener("mousedown", mouseDownHandler);
      canvas.removeEventListener("mousemove", mouseMoveHandler);
      canvas.removeEventListener("mouseup", mouseUpHandler);
      canvas.removeEventListener("mouseleave", mouseLeaveHandler);
      canvas.removeEventListener("touchstart", startTouch);
      canvas.removeEventListener("touchmove", moveTouch);
      canvas.removeEventListener("touchend", endTouch);
    };
  }, [startPaint, paint, exitPaint, startErase, erase, exitErase]);

  return (
    <>
      <St.DrawWrap>
        <St.Canvas
          ref={canvasRef}
          height={canvasHeight}
          width={canvasWidth}
          isCanvas={isCanvas}
        />
        <St.ToolBox>
          {selectPen && isCanvas ? (
            <>
              <St.PenSizeTool>
                <PenTool
                  color={selectedColor}
                  selectedSize={selectedSize}
                  onSizeSelect={selectPenSizeHandler}
                />
              </St.PenSizeTool>
              <Palette
                selectedColor={selectedColor}
                onColorSelect={selectColorHandler}
              />
            </>
          ) : (
            <St.PenButton
              type="button"
              onClick={() => switchModeHandler("pen")}
              color={selectedColor}
              mode={mode}
            >
              <FaPencilAlt />
            </St.PenButton>
          )}

          <St.EraserButton
            type="button"
            onClick={() => switchModeHandler("eraser")}
            mode={mode}
          >
            <BsFillEraserFill />
          </St.EraserButton>
          <St.RebootButton type="button" onClick={clearCanvas}>
            <BsFillTrash3Fill />
          </St.RebootButton>
        </St.ToolBox>
      </St.DrawWrap>
    </>
  );
};

export default Canvas;
