import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputValue } from "../data/type/type";
import Flex from "../components/Flex";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import { useInput } from "../features/post/hooks/useInput";
import { useGetDetail } from "../features/detail/hooks/useGetDetail";
import { useEdit } from "../features/detail/hooks/useEdit";
import Canvas from "../features/post/components/Canvas";
import PostInput from "../features/post/components/PostInput";
import * as St from "../features/post/styles/DrawingStyle";
import {
  Label,
  ScoreBox,
  StarWrap,
  SubmitBox,
} from "../features/post/styles/ImageStyle";
import StarScore from "../features/post/components/StarScore";
import EmoScore from "../features/post/components/EmoScore";
import { useWindowSize } from "../hooks/useWindowSize";

const DrawEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dailyId = Number(params.id);
  const { targetItem, year, month } = useGetDetail(dailyId);
  const { resizeHandler, desktop, tablet, mobile } = useWindowSize();

  // 캔버스 상태
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 글작성 조건 상태
  const [validPicture, setValidPicture] = useState<boolean>(true);

  // 조건부 렌더링용 상태
  const [isCanvas, setIsCanvas] = useState<boolean>(false);

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
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");
    const image = new Image();
    image.crossOrigin = "use-credentials"; // tainted canvas 방지용
    image.src = `${targetItem?.imgUrl}`; // S3 버킷 이미지 URL
    image.onload = () => {
      // 이미지가 로드되었을 때 캔버스에 그리기
      ctx?.drawImage(image, 0, 0, canvasWidth, canvasHeight); // 이미지 그리기
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const canvasHeight = desktop ? 550 : tablet ? 500 : mobile ? 340 : 320;

  const canvasWidth = desktop ? 580 : tablet ? 430 : mobile ? 450 : 320;

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

  const savePicture = (event: React.MouseEvent) => {
    event.preventDefault();
    setInputValue({ ...inputValue, deleteImg: true });
    savePictureHandler();
    setValidPicture((pre) => !pre);
    setIsCanvas((pre) => !pre);
  };

  // 별점
  const clicked = [false, false, false, false, false];
  const itemStar = clicked.map((_, i) => i < targetItem?.star);
  const [editStar, setEditStar] = useState<boolean[]>(itemStar);

  const clickStarHandler = (score: number) => {
    setEditStar(clicked.map((_, i) => i < score));
    scoreStarHandler(score);
  };

  // 글작성 함수
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validPicture) {
      editDiaryHandler(event);
    }
  };
  useEffect(() => {
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
  }, []);

  return (
    <St.DrawPostWrap>
      <form onSubmit={submitFormHandler}>
        <St.Wrapper>
          <Flex jc="center" ai="center">
            <Canvas
              isCanvas={isCanvas}
              canvasRef={canvasRef}
              validation={setValidPicture}
              canvasHeight={canvasHeight}
              canvasWidth={canvasWidth}
            />
            <Button size="large" type="button" onClick={savePicture}>
              {validPicture ? "더그리기" : "그림저장"}
            </Button>
          </Flex>

          <Flex row>
            <St.DrawingPostWrap>
              <ScoreBox>
                <EmoScore value={inputValue.emoId} action={clickEmojiHandler} />
                <StarWrap>
                  <StarScore arr={editStar} action={clickStarHandler} />
                  <p>
                    {inputValue.star ? inputValue.star : "별점을 입력하세요"}
                  </p>
                </StarWrap>
              </ScoreBox>
              <PostInput action={onChangeHandler} value={inputValue} />
              <SubmitBox>
                <Label>
                  공유여부
                  <Checkbox
                    name="share"
                    checked={inputValue?.share}
                    onChange={onCheckHandler}
                  />
                </Label>

                <Button
                  important
                  size="large"
                  type="submit"
                  disabled={!validPicture}
                >
                  등록하기
                </Button>
              </SubmitBox>
            </St.DrawingPostWrap>
          </Flex>
        </St.Wrapper>
      </form>
    </St.DrawPostWrap>
  );
};

export default DrawEdit;
