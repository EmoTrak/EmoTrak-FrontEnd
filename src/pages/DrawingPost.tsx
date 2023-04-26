import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../features/post/hooks/usePost";
import { useInput } from "../features/post/hooks/useInput";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Star from "../components/Icon/Star";
import Palette from "../features/post/components/Palette";
import { usePen } from "../features/post/hooks/usePen";
import { useEraser } from "../features/post/hooks/useEraser";
import { Coordinate, InputValue } from "../data/type/type";
import { StCanvasWrapper } from "../features/post/components/Canvas";
import PenTool from "../features/post/components/PenTool";
import { getCookie } from "../utils/cookies";
import BallPointPen from "../assets/Drawing/Ball Point Pen.png";
import Eraser from "../assets/Drawing/Erase.png";
import Reboot from "../assets/Drawing/Reboot.png";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { themeColor } from "../utils/theme";
import * as St from "../features/post/styles/DrawingStyle";
import {
  MobileStarWrap,
  StarWrap,
  Label,
  ScoreBox,
  TextArea,
  SubmitBox,
} from "../features/post/styles/ImageStyle";

const DrawingPost = () => {
  const token = getCookie("token");
  const refreshToken = getCookie("refreshToken");
  const navigate = useNavigate();

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

  const newItem: InputValue = {
    year,
    month,
    day,
    draw: true,
    emoId: 0,
    star: 0,
    detail: "",
    deleteImg: false,
    share: false,
    restrict: false,
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
  const [selectedColor, setSelectedColor] = useState<string>(
    themeColor.main.black
  );
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
    const rect = canvas.getBoundingClientRect(); // 캔버스의 뷰포트 상의 위치 정보를 가져옴
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
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
  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validEmoji === false || validStar === false) {
      alert("글 내용을 모두 입력해주세요.");
    }
    if (validEmoji && validStar) {
      submitDiaryHandler(event);
    }
  };

  useEffect(() => {
    if (!token && !refreshToken) {
      navigate("/");
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
    <St.DrawPostWrap>
      <form onSubmit={submitFormHandler}>
        <St.Wrapper>
          <MobileStarWrap>
            {[1, 2, 3, 4, 5].map((score) => (
              <Star
                key={score}
                size="5vw"
                color={
                  clicked[score - 1]
                    ? themeColor.palette.yellow
                    : themeColor.main.oatmeal
                }
                onClick={() => changeStarHandler(score)}
              />
            ))}
          </MobileStarWrap>
          <St.DrawWrap>
            <St.Canvas
              ref={canvasRef}
              height={700}
              width={800}
              onMouseDown={mouseDownHandler}
              onMouseMove={mouseMoveHandler}
              onMouseUp={mouseUpHandler}
              onMouseLeave={mouseLeaveHandler}
              onTouchStart={startTouch}
              onTouchMove={moveTouch}
              onTouchEnd={endTouch}
            ></St.Canvas>
            <St.ToolBox>
              <St.ToolList>
                <St.PenSizeTool>
                  {selectPen ? (
                    <PenTool
                      color={selectedColor}
                      selectedSize={selectedSize}
                      onSizeSelect={selectPenSizeHandler}
                      setSelectPen={setSelectPen}
                    />
                  ) : null}
                </St.PenSizeTool>
                <div>
                  {selectPen ? (
                    <>
                      <Palette
                        selectedColor={selectedColor}
                        onColorSelect={selectColorHandler}
                        setSelectPen={setSelectPen}
                      />
                    </>
                  ) : null}
                </div>
                <St.PenButton
                  type="button"
                  value="pen"
                  url={BallPointPen}
                  onClick={switchModeHandler}
                ></St.PenButton>
              </St.ToolList>
              <St.ToolList>
                <St.EraserButton
                  url={Eraser}
                  type="button"
                  value="eraser"
                  onClick={switchModeHandler}
                ></St.EraserButton>
              </St.ToolList>
              <St.RebootButton
                type="button"
                url={Reboot}
                onClick={clearCanvas}
              ></St.RebootButton>
            </St.ToolBox>
          </St.DrawWrap>
          <St.DrawingPostWrap>
            <StCanvasWrapper>
              <ScoreBox>
                <St.UnorderLi>
                  {emoIds.map((item: number) => (
                    <St.List key={item}>
                      <St.EmoButton
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
                      </St.EmoButton>
                    </St.List>
                  ))}
                </St.UnorderLi>
                <StarWrap>
                  {starArray.map((score) => (
                    <Star
                      key={score}
                      size="30"
                      color={
                        clicked[score - 1]
                          ? themeColor.palette.yellow
                          : themeColor.main.oatmeal
                      }
                      onClick={() => changeStarHandler(score)}
                    />
                  ))}
                  <p>{inputValue.star === 0 ? "?" : inputValue.star}</p>
                </StarWrap>
              </ScoreBox>
              <div>
                <label>
                  <TextArea
                    name="detail"
                    value={inputValue?.detail}
                    spellCheck={false}
                    required
                    maxLength={1500}
                    onChange={onChangeHandler}
                  ></TextArea>
                </label>
              </div>
              <SubmitBox>
                <Label>
                  공유여부
                  <Checkbox
                    name="share"
                    checked={inputValue?.share === true}
                    onChange={onCheckHandler}
                  />
                </Label>
                {validPicture ? (
                  <Button
                    style={{
                      backgroundColor: themeColor.main.pink,
                      color: themeColor.main.white,
                    }}
                    size="large"
                    type="submit"
                  >
                    등록하기
                  </Button>
                ) : (
                  <Button size="large" type="button" onClick={savePicture}>
                    그림저장
                  </Button>
                )}
              </SubmitBox>
            </StCanvasWrapper>
          </St.DrawingPostWrap>
        </St.Wrapper>
      </form>
    </St.DrawPostWrap>
  );
};

export default DrawingPost;
