import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputValue } from "../data/type/type";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Flex from "../components/Flex";
import { usePost } from "../features/post/hooks/usePost";
import { useInput } from "../features/post/hooks/useInput";
import * as St from "../features/post/styles/DrawingStyle";
import {
  StarWrap,
  Label,
  ScoreBox,
  SubmitBox,
} from "../features/post/styles/ImageStyle";
import Canvas from "../features/post/components/Canvas";
import PostInput from "../features/post/components/PostInput";
import StarScore from "../features/post/components/StarScore";
import EmoScore from "../features/post/components/EmoScore";

const DrawingPost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [year, month, day] = (params.date || "").split("-").map(Number);

  // 조건부 렌더링용 상태
  const [isCanvas, setIsCanvas] = useState<boolean>(true);

  // 글작성 조건 상태
  const [validPicture, setValidPicture] = useState<boolean>(false);
  const [validStar, setValidStar] = useState<boolean>(false);
  const [validEmoji, setValidEmoji] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const savePicture = () => {
    setValidPicture((pre) => !pre);
    savePictureHandler();
    setIsCanvas((pre) => !pre);
  };

  // 별점
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const clickStarHandler = (score: number): void => {
    setClicked(clicked.map((_, i) => i < score));
    scoreStarHandler(score);
    setValidStar(true);
  };

  const changeEmojiHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    clickEmojiHandler(event);
    setValidEmoji(true);
  };

  // 글작성 함수
  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validPicture && validEmoji && validStar) {
      submitDiaryHandler(event);
      return;
    }
    if (!validPicture) {
      alert("그림을 저장해주세요!");
    }
    if (!validEmoji || !validStar) {
      alert("글 내용을 모두 입력해주세요.");
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
            />
            <Button size="medium" type="button" onClick={savePicture}>
              {isCanvas ? "그림저장" : "더그리기"}
            </Button>
          </Flex>
          <Flex row>
            <St.DrawingPostWrap>
              <ScoreBox>
                <EmoScore
                  value={inputValue.emoId}
                  action={changeEmojiHandler}
                />
                <StarWrap>
                  <StarScore arr={clicked} action={clickStarHandler} />
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

                <Button important size="large" type="submit">
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

export default DrawingPost;
