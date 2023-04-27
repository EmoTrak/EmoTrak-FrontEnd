import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HOME_PAGE } from "../data/routes/urls";
import { InputValue } from "../data/type/type";
import { useInput } from "../features/post/hooks/useInput";
import { usePost } from "../features/post/hooks/usePost";
import { usePreview } from "../features/post/hooks/usePreview";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import StarScore from "../features/post/components/StarScore";
import EmoScore from "../features/post/components/EmoScore";
import * as St from "../features/post/styles/ImageStyle";
import PostInput from "../features/post/components/PostInput";

const ImagePost = () => {
  const navigate = useNavigate();

  // 날짜
  const params = useParams();
  const [year, month, day] = (params.date || "").split("-").map(Number);
  // 글작성 조건 상태
  const [valid, setValid] = useState({
    photo: false,
    star: false,
    emoji: false,
  });

  const newItem: InputValue = {
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
  } = useInput(newItem);

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
  const clickStarHandler = (score: number): void => {
    setClicked(clicked.map((_, i) => i <= score - 1));
    scoreStarHandler(score);
    setValid({ ...valid, star: true });
  };

  // 드래그앤 드랍
  const dragOverHandler = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropHandler = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    fileDropHandler(event);
    setValid({ ...valid, photo: true });
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (valid.photo && valid.emoji && valid.star) {
      submitDiaryHandler(event);
    } else {
      event.preventDefault();
      alert("내용을 모두 입력해주세요!");
    }
  };

  const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValid({ ...valid, photo: true });
    fileInputHandler(event);
  };

  const changeEmojiHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    clickEmojiHandler(event);
    setValid({ ...valid, emoji: true });
  };

  const deletePhotoHandler = () => {
    setValid({ ...valid, photo: false });
  };

  useEffect(() => {
    preview(photo);
    const preventGoBack = () => {
      if (window.confirm("페이지를 나가시겠습니까?")) {
        navigate(HOME_PAGE);
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    // 새로고침 막기 변수
    const preventClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
      window.removeEventListener("beforeunload", preventClose);
    };
  }, [photo]);

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <St.Wrapper>
          <St.ImageWrap>
            {valid.photo ? (
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
                  <label onDragOver={dragOverHandler} onDrop={dropHandler}>
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
            <St.ScoreBox>
              <EmoScore value={inputValue.emoId} action={changeEmojiHandler} />
              <St.StarWrap>
                <StarScore arr={clicked} action={clickStarHandler} />
                <span>{inputValue.star === 0 ? "별점" : inputValue.star}</span>
              </St.StarWrap>
            </St.ScoreBox>
            <PostInput action={onChangeHandler} value={inputValue} />
            <St.SubmitBox>
              <St.Label>
                공유여부
                <Checkbox
                  name="share"
                  checked={inputValue.share}
                  onChange={onCheckHandler}
                />
              </St.Label>
              <Button size="large">등록하기</Button>
            </St.SubmitBox>
          </St.ImagePostWrap>
        </St.Wrapper>
      </form>
    </>
  );
};

export default ImagePost;
