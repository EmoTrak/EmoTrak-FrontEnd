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
import PenTool from "../features/post/components/PenTool";

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
  // 날짜
  const params = useParams();
  const year: number | undefined = Number(params.date?.split("-")[0]);
  const month: number | undefined = Number(params.date?.split("-")[1]);
  const day: number | undefined = Number(params.date?.split("-")[2]);

  // 캔버스 상태
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 글작성 조건 상태
  const [validPicture, setValidPicture] = useState<boolean>(false);
  const [validStar, setValidStar] = useState<boolean>(false);
  const [validEmoji, setValidEmoji] = useState<boolean>(false);

  // const canvas = canvasRef.current;

  const newItem: InputValue = {
    year,
    month,
    day,
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
    canvasRef,
  });

  // 그림판 모드, 색깔 상태 관리
  const [mode, setMode] = useState<string>("pen");
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [selectPen, setSelectPen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<number>(5);

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

  const { startPaint, paint, exitPaint, moveTouch, startTouch, endTouch } =
    usePen(canvasRef, getCoordinates, selectedColor, selectedSize);

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
    setSelectPen((pre) => !pre);
  };

  // 색깔 변경 함수
  const selectColorHandler = (color: string): void => {
    setSelectedColor(color);
    setMode("pen");
  };

  const selectPenSizeHandler = (size: number): void => {
    setSelectedSize(size);
    setMode("pen");
  };

  const savePicture = () => {
    setValidPicture(true);
    savePictureHandler();
  };

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

  const changeStarHandler = (score: number) => {
    clickStarHandler(score);
    setValidStar(true);
  };

  const changeEmojiHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    clickEmojiHandler(event);
    setValidEmoji(true);
  };

  // 글작성 함수
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (validPicture && validEmoji && validStar) {
      submitDiaryHandler(event);
    } else {
      event.preventDefault();
      alert("내용을 모두 입력해주세요!");
    }
  };

  return (
    <div style={{ height: "80vh" }}>
      <form onSubmit={submitFormHandler}>
        <Flex row gap={10}>
          <StCanvasWrapper>
            <div style={{ backgroundColor: "#f4f2ee" }}>
              <canvas
                ref={canvasRef}
                height={700}
                width={700}
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                onMouseUp={mouseUpHandler}
                onMouseLeave={mouseLeaveHandler}
                onTouchStart={startTouch}
                onTouchMove={moveTouch}
                onTouchEnd={endTouch}
              ></canvas>
            </div>
            <Flex row>
              <ul>도구 선택</ul>
              <li>
                {selectPen ? (
                  <PenTool
                    color={selectedColor}
                    selectedSize={selectedSize}
                    onSizeSelect={selectPenSizeHandler}
                    setSelectPen={setSelectPen}
                  />
                ) : null}
                <button
                  type="button"
                  value="pen"
                  onClick={(e) => switchModeHandler(e)}
                >
                  펜
                </button>
                {selectPen ? (
                  <>
                    <Palette
                      selectedColor={selectedColor}
                      onColorSelect={selectColorHandler}
                      setSelectPen={setSelectPen}
                    />
                  </>
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
              <button type="button" onClick={clearCanvas}>
                다시 그리기
              </button>
              <button type="button" onClick={savePicture}>
                그리기 완료
              </button>
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
                      onClick={changeEmojiHandler}
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
                  onClick={() => changeStarHandler(score)}
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
                  required
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
    </div>
  );
};

export default DrawingPost;

export const StList = styled.li`
  list-style-type: none;
`;

export const StUnorderLi = styled.ul`
  gap: 20px;
`;

export const StEmoButton = styled.button`
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
