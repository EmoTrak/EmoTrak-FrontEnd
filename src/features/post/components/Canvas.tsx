import React, { useCallback, useEffect, useRef, useState } from "react";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import Palette from "./Palette";
import { usePen } from "../hooks/usePen";
import { useEraser } from "../hooks/useEraser";

type CanvasProps = {
  width: number;
  height: number;
};

type Coordinate = {
  x: number;
  y: number;
};

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 그림판 모드, 색깔 상태 관리
  const [mode, setMode] = useState<string>("pen");
  const [selectedColor, setSelectedColor] = useState<string>("");

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
    selectedColor
  );

  const { startErase, erase, exitErase } = useEraser(
    canvasRef,
    getCoordinates,
    selectedColor
  );

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

  const saveImageHandler = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // // canvas를 JPEG 데이터 URL로 변환
      // const dataURL = canvas.toDataURL("image/jpeg", 0.8); // 'image/jpeg' 포맷, 품질 0.8
      // // 데이터 URL을 Blob 객체로 변환
      // const byteString = atob(dataURL.split(",")[1]);
      // const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
      // const ab = new ArrayBuffer(byteString.length);
      // const ia = new Uint8Array(ab);
      // for (let i = 0; i < byteString.length; i++) {
      //   ia[i] = byteString.charCodeAt(i);
      // }
      // const blob = new Blob([ab], { type: mimeString });
    }
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
        <Flex row>
          <ul>도구 선택</ul>
          <li>
            <Palette
              selectedColor={selectedColor}
              onColorSelect={selectColorHandler}
            />
          </li>
          <li>
            <button value="eraser" onClick={(e) => switchModeHandler(e)}>
              지우개
            </button>
          </li>
        </Flex>
        <canvas
          ref={canvasRef}
          height={height}
          width={width}
          style={{ backgroundColor: "#f4f2ee" }}
          onMouseDown={mouseDownHandler}
          onMouseMove={mouseMoveHandler}
          onMouseUp={mouseUpHandler}
          onMouseLeave={mouseLeaveHandler}
        ></canvas>
        <button onClick={clearCanvas}>다시 그리기</button>
        여기가 그림판
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
  width: 50%;
  height: 100%;
  border: 1px solid;
  justify-content: center;
  align-items: center;
`;
