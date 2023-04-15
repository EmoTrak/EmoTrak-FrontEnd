import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getCookie, removeCookie } from "../utils/cookies";
import { LOGIN_PAGE } from "../data/routes/urls";

const ImageEdit = () => {
  const params = useParams();
  const dailyId = Number(params.id);
  const navigate = useNavigate();
  const token = getCookie("token");

  const [validPhoto, setValidPhoto] = useState<boolean>(true);
  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`);
  }, [dailyId]);

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
  }, [token]);

  const { data, isLoading } = useQuery([`${keys.GET_DETAIL}`], getDetail, {
    retry: 0,
  });
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
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragRef = useRef<HTMLLabelElement | null>(null);

  const dragOverHandler = useCallback((event: React.DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer!.files) {
      // setIsDragging(true);
    }
  }, []);

  const dropHandler = useCallback(
    (event: React.DragEvent<HTMLLabelElement>): void => {
      event.preventDefault();
      event.stopPropagation();

      fileDropHandler(event);
      // setIsDragging(false);
      setValidPhoto(true);
    },
    []
  );

  // 기존 이미지 state 설정
  const [exPhoto, setExPhoto] = useState<string | undefined>(
    targetItem?.imgUrl
  );

  useEffect(() => {
    preview(photo);
  }, [photo, exPhoto]);

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
    setExPhoto(undefined);
    fileInputHandler(null);
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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <div>
          {exPhoto ? (
            <StPhotoPreview url={`${targetItem?.imgUrl}`}>
              <button type="button" onClick={deleteExistingPhotoHandler}>
                삭제
              </button>
            </StPhotoPreview>
          ) : validPhoto ? (
            <StPhotoPreview url={`${previewUrl}`}>
              {validPhoto ? (
                <button type="button" onClick={deletePhotoHandler}>
                  삭제
                </button>
              ) : null}
            </StPhotoPreview>
          ) : (
            <StPhotoInputBox>
              <label
                ref={dragRef}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}
              >
                <StPhotoInput
                  type="file"
                  accept="image/jpeg image/png image/jpg image/gif"
                  onChange={changeFileHandler}
                  required
                />
              </label>
            </StPhotoInputBox>
          )}
        </div>
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

export default ImageEdit;
