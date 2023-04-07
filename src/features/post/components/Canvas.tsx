import React, { useCallback, useEffect, useRef, useState } from "react";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import Eyedropper from "./Eyedropper";
import Palette from "./Palette";

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
  //   const contextRef = useRef(null);

  // 상태 관리
  const [mousePosition, setMousePosition] =
    useState<Coordinate | undefined>(undefined);
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [isErasing, setIsErasing] = useState<boolean>(false);

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

  // canvas에 선긋는 함수
  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
    color: string
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
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
      const coordinates = getCoordinates(event);
      if (coordinates) {
        setIsPainting(true);
        setIsErasing(false);
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
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition, selectedColor);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setIsErasing(false);
  }, []);

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

  // 지우개 함수
  const eraseLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
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
  };

  const startErase = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const coordinates = getCoordinates(event);
      if (coordinates) {
        setIsErasing(true);
        setIsPainting(false);
        setMousePosition(coordinates);
      }
    },
    []
  );

  const erase = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      event.preventDefault(); // prevent drag
      event.stopPropagation(); // prevent drag

      if (isErasing) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          eraseLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isErasing, mousePosition]
  );

  const exitErase = useCallback(() => {
    setIsErasing(false);
    setIsPainting(false);
  }, []);

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

  // addEventListener를 사용한 마우스이벤트 처리
  // useEffect(() => {
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas: HTMLCanvasElement = canvasRef.current;
  //   if (mode === "pen") {
  //     canvas.addEventListener("mousedown", startPaint);
  //     canvas.addEventListener("mousemove", paint);
  //     canvas.addEventListener("mouseup", exitPaint);
  //     canvas.addEventListener("mouseleave", exitPaint);
  //   }

  //   if (mode === "eraser") {
  //     canvas.addEventListener("mousedown", startErase);
  //     canvas.addEventListener("mousemove", erase);
  //     canvas.addEventListener("mouseup", exitErase);
  //     canvas.addEventListener("mouseleave", exitErase);
  //   }

  //   return () => {
  //     if (mode === "pen") {
  //       canvas.removeEventListener("mousedown", startPaint);
  //       canvas.removeEventListener("mousemove", paint);
  //       canvas.removeEventListener("mouseup", exitPaint);
  //       canvas.removeEventListener("mouseleave", exitPaint);
  //     }
  //     if (mode === "eraser") {
  //       canvas.removeEventListener("mousedown", startErase);
  //       canvas.removeEventListener("mousemove", erase);
  //       canvas.removeEventListener("mouseup", exitErase);
  //       canvas.removeEventListener("mouseleave", exitErase);
  //     }
  //   };
  // }, [startPaint, paint, exitPaint, startErase, erase, exitErase]);

  return (
    <StCanvasWrapper>
      <Flex jc="center" ai="center">
        {/* <Eyedropper
          selectedColor={selectedColor}
          onColorSelect={selectColorHandler}
        /> */}
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
  /* display: flex;
  flex-direction: column; */
  width: 50%;
  height: 100%;
  border: 1px solid;
  justify-content: center;
  align-items: center;
`;
