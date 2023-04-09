import React, { useCallback, useRef, useState } from "react";
import Flex from "../components/Flex";
import { useParams } from "react-router-dom";
import { usePost } from "../features/post/hooks/usePost";
import { useInput } from "../features/post/hooks/useInput";
import styled from "styled-components";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Star from "../components/Icon/Star";
import Palette from "../features/post/components/Palette";
import { usePen } from "../features/post/hooks/usePen";
import { useEraser } from "../features/post/hooks/useEraser";
import { Coordinate } from "../data/type/d3";
import { StCanvasWrapper } from "../features/post/components/Canvas";

export type InputValue = {
  year: number;
  month: number;
  day: number;
  emoId: number;
  star: number;
  detail: string;
  deleteImg: boolean;
  share: boolean;
};

const DrawingPost = (): JSX.Element => {
  const params = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;

  // const date = params.date.split("-")
  // const year = date[0]
  // const month = date[1]
  // const day = date[2]
  const newItem: InputValue = {
    year: 0,
    month: 0,
    day: 0,
    emoId: 0,
    star: 0,
    detail: "",
    deleteImg: false,
    share: false,
  };
  const {
    onChangeHandler,
    onCheckHandler,
    clickEmojiHandler,
    inputValue,
    scoreStarHandler,
  } = useInput(newItem);

  const { submitDiaryHandler, savePictureHandler } = usePost({
    inputValue,
    canvas,
  });

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

  // const savePictureHandler = useCallback(() => {
  //   canvas?.toBlob((blob) => {
  //     if (blob) {
  //       console.log("blob =", blob);
  //       // setPicture(blob);
  //       // setImage(blob);
  //     }
  //   });
  // }, []);

  // useEffect + AddEventListener 대체 함수
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

  // 감정 선택
  const emoIds: number[] = [1, 2, 3, 4, 5, 6];

  // 별점
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const starArray: number[] = [1, 2, 3, 4, 5];
  const clickStarHandler = (index: number): void => {
    setClicked(clicked.map((_, i) => i <= index - 1));
    scoreStarHandler(index);
  };

  return (
    <>
      <form onSubmit={submitDiaryHandler}>
        <Flex row gap={10}>
          <StCanvasWrapper>
            <Flex jc="center" ai="center">
              <canvas
                ref={canvasRef}
                height={700}
                width={700}
                style={{ backgroundColor: "#f4f2ee" }}
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                onMouseUp={mouseUpHandler}
                onMouseLeave={mouseLeaveHandler}
              ></canvas>
              <button type="button" onClick={clearCanvas}>
                다시 그리기
              </button>
              <button type="button" onClick={savePictureHandler}>
                그리기 완료
              </button>
            </Flex>
            <Flex row>
              <ul>도구 선택</ul>
              <li>
                <button
                  type="button"
                  value="pen"
                  onClick={(e) => switchModeHandler(e)}
                >
                  펜
                </button>
                {mode === "pen" ? (
                  <Palette
                    selectedColor={selectedColor}
                    onColorSelect={selectColorHandler}
                  />
                ) : null}
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
          </StCanvasWrapper>{" "}
          <StCanvasWrapper>
            <div>
              <StUnorderLi style={{ display: "flex", flexDirection: "row" }}>
                {emoIds.map((item: number) => (
                  <StList key={item}>
                    <StEmoButton
                      name="emoId"
                      type="button"
                      value={item}
                      onClick={clickEmojiHandler}
                    >
                      <EmotionIcons
                        height="50"
                        width="50"
                        emotionTypes={`EMOTION_${item}`}
                      />
                    </StEmoButton>
                  </StList>
                ))}
              </StUnorderLi>
            </div>
            <div>
              {starArray.map((score) => (
                <Star
                  key={score}
                  size="30"
                  color={clicked[score - 1] ? "#FFDC82" : "#E5DFD3"}
                  onClick={() => clickStarHandler(score)}
                />
              ))}
              <span>{inputValue.star === 0 ? null : inputValue.star}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>
                공유여부
                <input name="share" type="checkbox" onChange={onCheckHandler} />
              </label>
              <label>
                내용
                <textarea
                  name="detail"
                  cols={30}
                  rows={10}
                  onChange={onChangeHandler}
                ></textarea>
              </label>
            </div>
          </StCanvasWrapper>
          <button type="submit">등록하기</button>
        </Flex>
      </form>
    </>
  );
};

export default DrawingPost;

const StList = styled.li`
  list-style-type: none;
`;

const StUnorderLi = styled.ul`
  gap: 20px;
`;

const StEmoButton = styled.button`
  width: 55px;
  height: 55px;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:focus {
    border: 5px solid grey;
  }
  &:hover {
    border: 5px solid grey;
  }
`;
