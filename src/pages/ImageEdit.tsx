import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputValue } from "../data/type/type";
import { useGetDetail } from "../features/detail/hooks/useGetDetail";
import { useInput } from "../features/post/hooks/useInput";
import { useEdit } from "../features/detail/hooks/useEdit";
import { usePreview } from "../features/post/hooks/usePreview";
import StarScore from "../features/post/components/StarScore";
import EmoScore from "../features/post/components/EmoScore";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import * as St from "../features/post/styles/ImageStyle";
import PostInput from "../features/post/components/PostInput";

const ImageEdit = () => {
  const params = useParams();

  const dailyId = Number(params.id);

  const [validPhoto, setValidPhoto] = useState<boolean>(true);

  const { preview, previewUrl } = usePreview();

  const { targetItem, year, month } = useGetDetail(dailyId);

  const editItem: InputValue = {
    year,
    month,
    day: targetItem?.day,
    draw: false,
    emoId: targetItem?.emoId,
    star: targetItem?.star,
    detail: targetItem?.detail,
    deleteImg: false,
    share: targetItem?.share,
    restrict: targetItem?.restrict,
  };

  const {
    onChangeHandler,
    onCheckHandler,
    clickEmojiHandler,
    inputValue,
    scoreStarHandler,
    setInputValue,
  } = useInput(editItem);

  const { editDiaryHandler, fileInputHandler, fileDropHandler, photo } =
    useEdit({
      inputValue,
      dailyId,
    });

  // 드래그앤 드랍
  const dragOverHandler = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dropHandler = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();

    fileDropHandler(event);
    setValidPhoto(true);
  };

  // 기존 이미지 state 설정
  const [exPhoto, setExPhoto] = useState<string | undefined>(
    targetItem?.imgUrl
  );

  // 별점
  const clicked = [false, false, false, false, false];
  const itemStar = clicked.map((_, i) => i < targetItem?.star);
  const [editStar, setEditStar] = useState<boolean[]>(itemStar);

  const clickStarHandler = (score: number) => {
    setEditStar(clicked.map((_, i) => i <= score - 1));
    scoreStarHandler(score);
  };

  const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidPhoto(true);
    setInputValue({ ...inputValue, deleteImg: true });
    fileInputHandler(event);
  };

  const deletePhotoHandler = () => {
    setValidPhoto(false);
  };

  const deleteExistingPhotoHandler = () => {
    setValidPhoto(false);
    setExPhoto(undefined);
    setInputValue({ ...inputValue, deleteImg: true });
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (validPhoto) {
      editDiaryHandler(event);
    } else {
      event.preventDefault();
      alert("사진을 첨부해주세요 !");
    }
  };

  useEffect(() => {
    preview(photo);
  }, [photo, exPhoto, dailyId]);

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <St.Wrapper>
          <St.ImageWrap>
            {exPhoto ? (
              <St.PhotoPreview>
                <St.PhotoPreviewImg src={`${targetItem?.imgUrl}`} />
                <St.DeletePhotoButton
                  type="button"
                  onClick={deleteExistingPhotoHandler}
                >
                  삭제
                </St.DeletePhotoButton>
              </St.PhotoPreview>
            ) : validPhoto ? (
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
              <EmoScore value={inputValue.emoId} action={clickEmojiHandler} />
              <St.StarWrap>
                <StarScore arr={editStar} action={clickStarHandler} />
                <span>{inputValue?.star ? inputValue?.star : "별점"}</span>
              </St.StarWrap>
            </St.ScoreBox>
            <PostInput action={onChangeHandler} value={inputValue} />
            <St.SubmitBox>
              <St.Label>
                공유여부
                <Checkbox
                  name="share"
                  checked={inputValue?.share}
                  disabled={editItem?.restrict}
                  onChange={onCheckHandler}
                />
              </St.Label>
              <Button size="large" important>
                등록하기
              </Button>
            </St.SubmitBox>
          </St.ImagePostWrap>
        </St.Wrapper>
      </form>
    </>
  );
};

export default ImageEdit;
