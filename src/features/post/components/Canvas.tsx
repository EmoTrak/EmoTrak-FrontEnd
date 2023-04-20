import React, { useRef, useState } from "react";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import Palette from "./Palette";
import { usePen } from "../hooks/usePen";
import { useEraser } from "../hooks/useEraser";
import { ContentProps } from "./Contents";

type CanvasProps = {
  width: number;
  height: number;
};

type Coordinate = {
  x: number;
  y: number;
};

const Canvas = ({ width, height, newItem }: CanvasProps & ContentProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  // 글작성 조건 상태
  const [validPicture, setValidPicture] = useState<boolean>(false);
  const [validStar, setValidStar] = useState<boolean>(false);
  const [validEmoji, setValidEmoji] = useState<boolean>(false);

  // 그림판 모드, 색깔 상태 관리
  const [mode, setMode] = useState<string>("pen");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number>(5);

  const [selectPen, setSelectPen] = useState<boolean>(false);

  // 좌표 함수
  const getCoordinates = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const { startPaint, paint, exitPaint } = usePen(
    canvasRef,
    getCoordinates,
    selectedColor,
    selectedSize
  );

  const { startErase, erase, exitErase } = useEraser(canvasRef, getCoordinates);

  // 캔버스 비우기
  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext("2d")!!.clearRect(0, 0, canvas.width, canvas.height);
  };

  // 지우개, 펜 모드 변경 함수
  const switchModeHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const button = event.target as HTMLButtonElement;
    const value = button.value;
    setMode(value);
  };

  // 색깔 변경 함수
  const selectColorHandler = (color: string): void => {
    setSelectedColor(color);
    setMode("pen");
  };

  const mouseDownHandler = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (mode === "pen") {
      startPaint(event);
    } else if (mode === "eraser") {
      startErase(event);
    }
  };

  const mouseMoveHandler = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (mode === "pen") {
      paint(event);
    } else if (mode === "eraser") {
      erase(event);
    }
  };

  const mouseUpHandler = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    if (mode === "pen") {
      exitPaint();
    } else if (mode === "eraser") {
      exitErase();
    }
  };
  const mouseLeaveHandler = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (mode === "pen") {
      exitPaint();
    } else if (mode === "eraser") {
      exitErase();
    }
  };

  return (
    <StCanvasWrapper>
      <Flex jc="center" ai="center">
        <canvas
          ref={canvasRef}
          height={height}
          width={width}
          style={{ backgroundColor: "#f4f2ee" }}
          onMouseDown={mouseDownHandler}
          onMouseMove={mouseMoveHandler}
          onMouseUp={mouseUpHandler}
          onMouseLeave={mouseLeaveHandler}
          // on={savePictureHanlder}
        ></canvas>
        <button type="button" onClick={clearCanvas}>
          다시 그리기
        </button>
      </Flex>
      <Flex row>
        <ul>도구 선택</ul>
        <li>
          <Palette
            selectedColor={selectedColor}
            onColorSelect={selectColorHandler}
            setSelectPen={setSelectPen}
          />
        </li>
        <li>
          <button
            type="button"
            value="eraser"
            onClick={(e) => switchModeHandler(e)}
          >
            지우개
          </button>
        </li>
      </Flex>
    </StCanvasWrapper>
  );
};

Canvas.defaultProps = {
  width: 800,
  height: 700,
};

export default Canvas;

export const StCanvasWrapper = styled.div`
  width: 45vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
