import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputValue, StEmoButton, StList, StUnorderLi } from "./DrawingPost";
import user from "../lib/api/user";
import { keys } from "../data/queryKeys/keys";
import { useQuery } from "@tanstack/react-query";
import { DetailType } from "./Detail";
import { useInput } from "../features/post/hooks/useInput";
import { usePost } from "../features/post/hooks/usePost";
import { useEdit } from "../features/detail/hooks/useEdit";
import { StCanvasWrapper } from "../features/post/components/Canvas";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Star from "../components/Icon/Star";
import { StPhotoInput, StPhotoInputBox, StPhotoPreview } from "./ImagePost";
import { usePreview } from "../features/post/hooks/usePreview";

const Edit = () => {
  const params = useParams();
  const dailyId = Number(params.id);

  const [validPhoto, setValidPhoto] = useState<boolean>(true);
  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`);
  }, [dailyId]);

  const { data, isLoading, isError, isSuccess } = useQuery(
    [`${keys.GET_DETAIL}`],
    getDetail,
    {
      retry: 0,
    }
  );
  const { preview, previewUrl } = usePreview();

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
    emoId: targetItem?.emoId,
    star: targetItem?.star,
    detail: targetItem?.detail,
    deleteImg: false,
    share: targetItem?.share,
  };

  const {
    onChangeHandler,
    onCheckHandler,
    clickEmojiHandler,
    inputValue,
    scoreStarHandler,
    setInputValue,
  } = useInput(editItem);

  const { editDiaryHandler, fileInputHandler, photo } = useEdit({
    inputValue,
    dailyId,
  });

  // 기존 이미지 state 설정
  const [exPhoto, setExPhoto] = useState(targetItem?.imgUrl);

  useEffect(() => {
    preview(photo);
  }, [photo, exPhoto]);

  // 감정 선택
  const emoIds: number[] = [1, 2, 3, 4, 5, 6];

  // 별점
  const clicked = [false, false, false, false, false];
  const starArray: number[] = [1, 2, 3, 4, 5];
  const itemStar = clicked.map((item, i) =>
    i < targetItem?.star ? true : false
  );

  const [editStar, setEditStar] = useState<boolean[]>(itemStar);

  const clickStarHandler = (index: number): void => {
    setEditStar(clicked.map((_, i) => i <= index - 1));
    scoreStarHandler(index);
  };

  const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidPhoto(true);
    setInputValue({ ...inputValue, deleteImg: true });
    fileInputHandler(event);
  };

  const deletePhotoHandler = () => {
    setValidPhoto(false);
    fileInputHandler(null);
  };

  const deleteExistingPhotoHandler = () => {
    setValidPhoto(false);
    setExPhoto(null);
    fileInputHandler(null);
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (validPhoto) {
      editDiaryHandler(event);
    } else {
      event.preventDefault();
      alert("수정 내용을 확인해주세요 !");
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <StPhotoInputBox>
          <StPhotoInput
            type="file"
            name="img"
            accept="image/jpeg"
            onChange={changeFileHandler}
          />
        </StPhotoInputBox>
        {exPhoto ? (
          <StPhotoPreview url={`${targetItem?.imgUrl}`}>
            <button type="button" onClick={deleteExistingPhotoHandler}>
              삭제
            </button>
          </StPhotoPreview>
        ) : (
          <StPhotoPreview url={`${previewUrl}`}>
            {validPhoto ? (
              <button type="button" onClick={deletePhotoHandler}>
                삭제
              </button>
            ) : null}
          </StPhotoPreview>
        )}
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
                color={editStar[score - 1] ? "#FFDC82" : "#E5DFD3"}
                onClick={() => clickStarHandler(score)}
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
                checked={inputValue.share === true}
                onChange={onCheckHandler}
              />
            </label>
            <label>
              내용
              <textarea
                name="detail"
                value={inputValue?.detail}
                cols={30}
                rows={10}
                required
                onChange={onChangeHandler}
              ></textarea>
            </label>
          </div>
        </StCanvasWrapper>
        <button type="submit">등록하기</button>
      </form>
    </>
  );
};

export default Edit;
