import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import user from "../lib/api/user";
import { keys } from "../data/queryKeys/keys";
import { useQuery } from "@tanstack/react-query";
import { useInput } from "../features/post/hooks/useInput";
import { useEdit } from "../features/detail/hooks/useEdit";
import { StCanvasWrapper } from "../features/post/components/Canvas";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Star from "../components/Icon/Star";
import { usePreview } from "../features/post/hooks/usePreview";
import { getCookie } from "../utils/cookies";
import Flex from "../components/Flex";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { themeColor } from "../utils/theme";
import { DetailType, InputValue } from "../data/type/type";
import * as St from "../features/post/styles/ImageStyle";
import {
  EmoButton,
  List,
  UnorderLi,
} from "../features/post/styles/DrawingStyle";

const ImageEdit = () => {
  const params = useParams();
  const dailyId = Number(params.id);
  const navigate = useNavigate();
  const token = getCookie("token");
  const refreshToken = getCookie("refreshToken");

  const [validPhoto, setValidPhoto] = useState<boolean>(true);
  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`);
  }, [dailyId]);

  useEffect(() => {
    if (!token && !refreshToken) {
      alert("로그인이 필요합니다 !");
      navigate("/");
    }
    // getDetail();
    const newClicked = clicked.map((_, index) =>
      index < targetItem?.star ? true : false
    );
    setClicked(newClicked);
    preview(photo);
  }, [token]);

  const { data, status, isLoading } = useQuery(
    [`${keys.GET_DETAIL}`],
    getDetail
  );
  const { preview, previewUrl } = usePreview();

  const year = data?.data.data.year;
  const month = data?.data.data.month;
  const contents = data?.data.data.contents;
  const targetItem = contents?.filter(
    (item: DetailType) => item.id === dailyId
  )[0];
  console.log(targetItem);
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
  const dragRef = useRef<HTMLLabelElement | null>(null);

  const dragOverHandler = useCallback((event: React.DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer!.files) {
    }
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

  // 기존 이미지 state 설정
  const [exPhoto, setExPhoto] = useState<string | undefined>(
    targetItem?.imgUrl
  );

  useEffect(() => {
    preview(photo);
  }, [photo, exPhoto, dailyId]);

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
        <Flex row>
          <StCanvasWrapper>
            {exPhoto ? (
              <>
                <St.PhotoPreviewImg src={`${targetItem?.imgUrl}`} />
                <St.DeletePhotoButton
                  type="button"
                  onClick={deleteExistingPhotoHandler}
                >
                  삭제
                </St.DeletePhotoButton>
              </>
            ) : validPhoto ? (
              <>
                <St.PhotoPreviewImg src={`${previewUrl}`} />
                {validPhoto ? (
                  <Button
                    size="small"
                    type="button"
                    onClick={deletePhotoHandler}
                  >
                    삭제
                  </Button>
                ) : null}
              </>
            ) : (
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
            )}
          </StCanvasWrapper>
          <StCanvasWrapper>
            <St.ScoreBox>
              <UnorderLi>
                {emoIds.map((item: number) => (
                  <List key={item}>
                    <EmoButton
                      name="emoId"
                      type="button"
                      value={item}
                      selected={inputValue.emoId === item ? true : false}
                      onClick={clickEmojiHandler}
                    >
                      <EmotionIcons
                        height="50"
                        width="50"
                        emotionTypes={`EMOTION_${item}`}
                      />
                    </EmoButton>
                  </List>
                ))}
              </UnorderLi>

              {starArray.map((score) => (
                <Star
                  key={score}
                  size="30"
                  color={
                    editStar[score - 1]
                      ? themeColor.main.yellow
                      : themeColor.main.paper
                  }
                  onClick={() => clickStarHandler(score)}
                />
              ))}
              <span>{inputValue?.star === 0 ? "?" : inputValue?.star}</span>
            </St.ScoreBox>
            <div>
              <label>
                내용
                <St.TextArea
                  name="detail"
                  value={inputValue?.detail}
                  cols={30}
                  rows={10}
                  spellCheck={false}
                  required
                  onChange={onChangeHandler}
                ></St.TextArea>
              </label>
            </div>
            <St.SubmitBox>
              <St.Label>
                공유여부
                <Checkbox
                  name="share"
                  checked={inputValue?.share === true}
                  disabled={editItem?.restrict}
                  onChange={onCheckHandler}
                />
              </St.Label>
              <Button size="large" type="submit">
                등록하기
              </Button>
            </St.SubmitBox>
          </StCanvasWrapper>
        </Flex>
      </form>
    </>
  );
};

export default ImageEdit;
