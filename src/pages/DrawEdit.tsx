import React, { useCallback, useEffect, useRef, useState } from "react";
import Flex from "../components/Flex";
import { useNavigate, useParams } from "react-router-dom";
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
import { getCookie, removeCookie } from "../utils/cookies";
import { LOGIN_PAGE } from "../data/routes/urls";
import user from "../lib/api/user";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../data/queryKeys/keys";
import { DetailType } from "./Detail";
import { useEdit } from "../features/detail/hooks/useEdit";

export type InputValue = {
  draw: boolean;
  year: number;
  month: number;
  day: number;
  emoId: number;
  star: number;
  detail: string;
  deleteImg: boolean;
  share: boolean;
  restrict: boolean;
};

const DrawEdit = (): JSX.Element => {
  const navigate = useNavigate();
  const token = getCookie("token");
  const params = useParams();
  const dailyId = Number(params.id);
  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`);
  }, [dailyId]);

  const { data } = useQuery([`${keys.GET_DETAIL}`], getDetail, {
    retry: 0,
  });

  // 캔버스 상태
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 글작성 조건 상태
  const [validPicture, setValidPicture] = useState<boolean>(false);

  const year = data?.data.data.year;
  const month = data?.data.data.month;
  const contents = data?.data.data.contents;
  const targetItem = contents?.filter(
    (item: DetailType) => item.id === dailyId
  )[0];

  const editItem: InputValue = {
    year,
    month,
    day: targetItem?.day,
    draw: true,
    emoId: targetItem?.emoId,
    star: targetItem?.star,
    detail: targetItem?.detail,
    deleteImg: false,
    share: targetItem?.share,
    restrict: targetItem?.restrict,
  };

  useEffect(() => {
    if (!token || token === "undefined") {
      if (token) {
        removeCookie("token");
        alert("로그인이 필요합니다 !");
        navigate(`${LOGIN_PAGE}`);
      }
    }
    getDetail();
    const newClicked = clicked.map((_, index) =>
      index < targetItem.star ? true : false
    );
    setClicked(newClicked);
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");
    const image = new Image();
    image.src = `${targetItem.imgUrl}`; // S3 버킷 이미지 URL
    image.crossOrigin = "Anonymous"; // tainted canvas 방지용
    image.onload = () => {
      // 이미지가 로드되었을 때 캔버스에 그리기
      ctx?.drawImage(image, 0, 0); // 이미지 그리기
    };
  }, [token]);

  const {
    onChangeHandler,
    onCheckHandler,
    clickEmojiHandler,
    inputValue,
    scoreStarHandler,
    setInputValue,
  } = useInput(editItem);

  const { editDiaryHandler, savePictureHandler } = useEdit({
    inputValue,
    dailyId,
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
    if (value === "eraser") {
      setMode(value);
    } else {
      setMode(value);
      setSelectPen((pre) => !pre);
    }
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
    setInputValue({ ...inputValue, deleteImg: true });
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
  };

  const changeEmojiHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    clickEmojiHandler(event);
  };

  // 글작성 함수
  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validPicture) {
      editDiaryHandler(event);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate(`${LOGIN_PAGE}`);
    }
    const preventGoBack = () => {
      if (window.confirm("페이지를 나가시겠습니까?")) {
        navigate(-1);
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    // 새로고침 막기 변수
    const preventClose = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
      window.removeEventListener("beforeunload", preventClose);
    };
  }, [token]);

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
                      selected={inputValue.emoId === item ? true : false}
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
                <input
                  name="share"
                  type="checkbox"
                  checked={inputValue?.share}
                  onChange={onCheckHandler}
                />
              </label>
              <label>
                내용
                <textarea
                  name="detail"
                  value={inputValue?.detail}
                  required
                  cols={30}
                  rows={10}
                  maxLength={1500}
                  onChange={onChangeHandler}
                ></textarea>
              </label>
            </div>
          </StCanvasWrapper>
          {validPicture ? (
            <button type="submit">등록하기</button>
          ) : (
            <button type="button" onClick={savePicture}>
              계속하기
            </button>
          )}
        </Flex>
      </form>
    </div>
  );
};

export default DrawEdit;

export const StList = styled.li`
  list-style-type: none;
`;

export const StUnorderLi = styled.ul`
  gap: 20px;
`;

type EmoButtonProps = {
  selected: boolean;
};

export const StEmoButton = styled.button<EmoButtonProps>`
  width: 55px;
  height: 55px;
  border: ${(props) =>
    props.selected ? "5px solid grey" : "5px solid transparent"};
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
