import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { BsFillEraserFill } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { themeColor } from "../../../utils/theme";
import { Coordinate } from "../../../data/type/type";
import { usePen } from "../hooks/usePen";
import { useEraser } from "../hooks/useEraser";
import PenTool from "./PenTool";
import Palette from "./Palette";
import * as St from "../styles/DrawingStyle";

interface Test {
  isCanvas: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas = ({ isCanvas, canvasRef }: Test) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeHandler = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // 좌표 함수
  const getCoordinates = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): Coordinate | undefined => {
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
  const [selectedSize, setSelectedSize] = useState<number>(5);

  const { startPaint, paint, exitPaint, moveTouch, startTouch, endTouch } =
    usePen(canvasRef, getCoordinates, selectedColor, selectedSize);

  const { startErase, erase, exitErase } = useEraser(canvasRef, getCoordinates);
  // 캔버스 비우기
  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      canvas.getContext("2d")!!.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  // useEffect + AddEventListener 대체 함수
  const mouseDownHandler = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const mouseDown = new Map([
      ["pen", () => startPaint(event)],
      ["eraser", () => startErase(event)],
    ]);
    const mousefunc = mouseDown.get(mode);

    return mousefunc && mousefunc();
  };

  const mouseMoveHandler = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const mouseMove = new Map([
      ["pen", () => paint(event)],
      ["eraser", () => erase(event)],
    ]);
    const mousefunc = mouseMove.get(mode);

    return mousefunc && mousefunc();
  };

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

  const canvasHeight =
    viewportWidth > 1023
      ? 550
      : viewportWidth > 767
      ? 500
      : viewportWidth > 500
      ? 340
      : 320;

  const canvasWidth =
    viewportWidth > 1023
      ? 580
      : viewportWidth > 767
      ? 430
      : viewportWidth > 500
      ? 450
      : 320;

  return (
    <>
      <St.DrawWrap>
        <St.Canvas
          ref={canvasRef}
          height={canvasHeight}
          width={canvasWidth}
          onMouseDown={mouseDownHandler}
          onMouseMove={mouseMoveHandler}
          onMouseUp={mouseUpHandler}
          onMouseLeave={mouseLeaveHandler}
          onTouchStart={startTouch}
          onTouchMove={moveTouch}
          onTouchEnd={endTouch}
          isCanvas={isCanvas}
        />
        <St.ToolBox>
          {selectPen && isCanvas && (
            <>
              <St.PenSizeTool>
                <PenTool
                  color={selectedColor}
                  selectedSize={selectedSize}
                  onSizeSelect={selectPenSizeHandler}
                  setSelectPen={setSelectPen}
                />
              </St.PenSizeTool>
              <Palette
                selectedColor={selectedColor}
                onColorSelect={selectColorHandler}
                setSelectPen={setSelectPen}
              />
            </>
          )}
          <St.PenButton
            type="button"
            onClick={() => switchModeHandler("pen")}
            color={selectedColor}
          >
            <FaPencilAlt />
          </St.PenButton>
          <St.EraserButton
            type="button"
            onClick={() => switchModeHandler("eraser")}
            color={mode}
          >
            <BsFillEraserFill />
          </St.EraserButton>
          <St.RebootButton type="button" onClick={clearCanvas}>
            <VscDebugRestart />
          </St.RebootButton>
        </St.ToolBox>
      </St.DrawWrap>
    </>
  );
};

export default Canvas;
