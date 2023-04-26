import React, { useCallback, useEffect, useRef, useState } from "react";
import { StCanvasWrapper } from "../features/post/components/Canvas";
import Star from "../components/Icon/Star";
import { useInput } from "../features/post/hooks/useInput";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../features/post/hooks/usePost";
import { usePreview } from "../features/post/hooks/usePreview";
import { getCookie } from "../utils/cookies";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { themeColor } from "../utils/theme";
import { HOME_PAGE } from "../data/routes/urls";
import { InputValue } from "../data/type/type";
import * as St from "../features/post/styles/ImageStyle";
import { EmoButton, UnorderLi } from "../features/post/styles/DrawingStyle";

const ImagePost = () => {
  const token = getCookie("token");
  const refreshToken = getCookie("refreshToken");
  const navigate = useNavigate();
  // 날짜
  const params = useParams();
  const year: number | undefined = Number(params.date?.split("-")[0]);
  const month: number | undefined = Number(params.date?.split("-")[1]);
  const day: number | undefined = Number(params.date?.split("-")[2]);

  // 글작성 조건 상태
  const [validPhoto, setValidPhoto] = useState<boolean>(false);
  const [validStar, setValidStar] = useState<boolean>(false);
  const [validEmoji, setValidEmoji] = useState<boolean>(false);
  const editItem: InputValue = {
    year,
    month,
    day,
    draw: false,
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
  } = useInput(editItem);

  const { submitDiaryHandler, fileInputHandler, fileDropHandler, photo } =
    usePost({
      inputValue,
    });
  const { preview, previewUrl } = usePreview();

  // 별점
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const clickStarHandler = (index: number): void => {
    setClicked(clicked.map((_, i) => i <= index - 1));
    scoreStarHandler(index);
  };

  // 드래그앤 드랍
  const dragRef = useRef<HTMLLabelElement | null>(null);

  const dragOverHandler = useCallback((event: React.DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const dropHandler = useCallback(
    (event: React.DragEvent<HTMLLabelElement>): void => {
      event.preventDefault();
      event.stopPropagation();

      fileDropHandler(event);
      setValidPhoto(true);
    },
    []
  );

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    if (validPhoto && validEmoji && validStar) {
      submitDiaryHandler(event);
    } else {
      event.preventDefault();
      alert("내용을 모두 입력해주세요!");
    }
  };

  const changeFileHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValidPhoto(true);
    fileInputHandler(event);
  };

  const changeStarHandler = (score: number): void => {
    clickStarHandler(score);
    setValidStar(true);
  };

  const changeEmojiHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    clickEmojiHandler(event);
    setValidEmoji(true);
  };

  const deletePhotoHandler = (): void => {
    setValidPhoto(false);
  };

  useEffect(() => {
    preview(photo);
    if (!token && !refreshToken) {
      navigate("/");
    }
    const preventGoBack = () => {
      if (window.confirm("페이지를 나가시겠습니까?")) {
        navigate(HOME_PAGE);
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
  }, [token, photo]);

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <St.Wrapper>
          <St.ImageWrap>
            {validPhoto ? (
              <St.PhotoPreview>
                <St.PhotoPreviewImg src={`${previewUrl}`} />
                <St.DeletePhotoButton
                  type="button"
                  onClick={deletePhotoHandler}
                >
                  삭제
                </St.DeletePhotoButton>
              </St.PhotoPreview>
            ) : (
              <St.PhotoInputContainer>
                <St.PhotoInputBox>
                  <label
                    ref={dragRef}
                    onDragOver={dragOverHandler}
                    onDrop={dropHandler}
                  >
                    <St.PhotoInput
                      type="file"
                      accept="image/jpeg image/png image/jpg image/gif"
                      onChange={changeFileHandler}
                      required
                    />
                  </label>
                </St.PhotoInputBox>
              </St.PhotoInputContainer>
            )}
          </St.ImageWrap>
          <St.ImagePostWrap>
            <StCanvasWrapper>
              <St.ScoreBox>
                <UnorderLi>
                  {[1, 2, 3, 4, 5, 6].map((item: number) => (
                    <EmoButton
                      name="emoId"
                      type="button"
                      key={item}
                      selected={inputValue.emoId === item ? true : false}
                      value={item}
                      onClick={changeEmojiHandler}
                    >
                      <EmotionIcons
                        height="100%"
                        width="100%"
                        emotionTypes={`EMOTION_${item}`}
                      />
                    </EmoButton>
                  ))}
                </UnorderLi>
                <St.StarWrap>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <Star
                      key={score}
                      size="30px"
                      color={
                        clicked[score - 1]
                          ? themeColor.palette.yellow
                          : themeColor.main.oatmeal
                      }
                      onClick={() => changeStarHandler(score)}
                    />
                  ))}
                  <p>
                    {inputValue.star === 0
                      ? "별점을 매겨주세요"
                      : inputValue.star}
                  </p>
                </St.StarWrap>
              </St.ScoreBox>
              <div>
                <label>
                  <St.TextArea
                    name="detail"
                    required
                    spellCheck={false}
                    maxLength={1500}
                    onChange={onChangeHandler}
                  ></St.TextArea>
                </label>
              </div>
              <St.SubmitBox>
                <St.Label>
                  공유여부
                  <Checkbox
                    name="share"
                    checked={inputValue.share}
                    disabled={editItem?.restrict}
                    onChange={onCheckHandler}
                  />
                </St.Label>
                <Button size="large" type="submit">
                  등록하기
                </Button>
              </St.SubmitBox>
            </StCanvasWrapper>
          </St.ImagePostWrap>
        </St.Wrapper>
      </form>
    </>
  );
};

export default ImagePost;
