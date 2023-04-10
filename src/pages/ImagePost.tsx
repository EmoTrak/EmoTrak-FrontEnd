import React, { useEffect, useState } from "react";
import Image from "../features/imagepost/components/Image";
import { StCanvasWrapper } from "../features/post/components/Canvas";
import { InputValue, StEmoButton, StList, StUnorderLi } from "./DrawingPost";
import Star from "../components/Icon/Star";
import { useInput } from "../features/post/hooks/useInput";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { useParams } from "react-router-dom";
import { usePost } from "../features/post/hooks/usePost";
import styled from "styled-components";
import { usePreview } from "../features/post/hooks/usePreview";

const ImagePost = (): JSX.Element => {
  const params = useParams();
  const year: number | undefined = Number(params.date?.split("-")[0]);
  const month: number | undefined = Number(params.date?.split("-")[1]);
  const day: number | undefined = Number(params.date?.split("-")[2]);
  const [validPhoto, setValidPhoto] = useState<boolean>(false);
  const [validStar, setValidStar] = useState<boolean>(false);
  const [validEmoji, setValidEmoji] = useState<boolean>(false);
  const newItem: InputValue = {
    year,
    month,
    day,
    emoId: 0,
    star: 0,
    detail: "",
    deleteImg: false,
    share: false,
  };
  const {
    onChangeHandler,
    onCheckHandler,
    clickEmojiHandler,
    inputValue,
    scoreStarHandler,
  } = useInput(newItem);

  const { submitDiaryHandler, fileInputHandler, photo } = usePost({
    inputValue,
  });
  const { preview, previewUrl } = usePreview();

  useEffect(() => {
    preview(photo);
  }, [photo]);
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

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    if (validPhoto && validEmoji && validStar) {
      submitDiaryHandler(event);
    } else {
      event.preventDefault();
      alert("내용을 모두 입력해주세요!");
    }
  };

  const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidPhoto(true);
    fileInputHandler(event);
  };

  const changeStarHandler = (score: number) => {
    clickStarHandler(score);
    setValidStar(true);
  };

  const changeEmojiHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    clickEmojiHandler(event);
    setValidEmoji(true);
  };

  const deletePhotoHandler = () => {
    setValidPhoto(false);
  };

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <StPhotoInputBox>
          <StPhotoInput
            type="file"
            name="img"
            accept="image/jpeg"
            onChange={changeFileHandler}
            required
          />
        </StPhotoInputBox>

        {validPhoto ? (
          <StPhotoPreview url={`${previewUrl}`}>
            <button type="button" onClick={deletePhotoHandler}>
              삭제
            </button>
          </StPhotoPreview>
        ) : null}
        <StCanvasWrapper>
          <div>
            <StUnorderLi style={{ display: "flex", flexDirection: "row" }}>
              {emoIds.map((item: number) => (
                <StList key={item}>
                  <StEmoButton
                    name="emoId"
                    type="button"
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
              <input name="share" type="checkbox" onChange={onCheckHandler} />
            </label>
            <label>
              내용
              <textarea
                name="detail"
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

export default ImagePost;

export const StPhotoInputBox = styled.li`
  width: 202px;
  height: 202px;
  position: relative;
  border: 1px solid rgb(230, 229, 239);
  background: rgb(250, 250, 253);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(155, 153, 169);
  font-size: 1rem;
  margin-right: 1rem;

  ::before {
    content: "";
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICAgIDxwYXRoIGZpbGw9IiNEQ0RCRTQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI4LjQ3MSAzMkgzLjUzYy0uOTcxIDAtMS44OTQtLjQyMi0yLjUyOS0xLjE1N2wtLjAyNi0uMDNBNCA0IDAgMCAxIDAgMjguMTk4VjguNjA3QTQgNCAwIDAgMSAuOTc0IDUuOTlMMSA1Ljk2YTMuMzQzIDMuMzQzIDAgMCAxIDIuNTI5LTEuMTU2aDIuNTM0YTIgMiAwIDAgMCAxLjUzNy0uNzJMMTAuNC43MkEyIDIgMCAwIDEgMTEuOTM3IDBoOC4xMjZBMiAyIDAgMCAxIDIxLjYuNzJsMi44IDMuMzYzYTIgMiAwIDAgMCAxLjUzNy43MmgyLjUzNGMuOTcxIDAgMS44OTQuNDIzIDIuNTI5IDEuMTU3bC4wMjYuMDNBNCA0IDAgMCAxIDMyIDguNjA2djE5LjU5MWE0IDQgMCAwIDEtLjk3NCAyLjYxN2wtLjAyNi4wM0EzLjM0MyAzLjM0MyAwIDAgMSAyOC40NzEgMzJ6TTE2IDkuNmE4IDggMCAxIDEgMCAxNiA4IDggMCAwIDEgMC0xNnptMCAxMi44YzIuNjQ3IDAgNC44LTIuMTUzIDQuOC00LjhzLTIuMTUzLTQuOC00LjgtNC44YTQuODA1IDQuODA1IDAgMCAwLTQuOCA0LjhjMCAyLjY0NyAyLjE1MyA0LjggNC44IDQuOHoiLz4KPC9zdmc+Cg==);
    margin-bottom: 1rem;
  }
`;

export const StPhotoInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  cursor: pointer;
  font-size: 0px;
`;

export type StPreviewProps = {
  url: string;
};

export const StPhotoPreview = styled.div<StPreviewProps>`
  width: 202px;
  height: 202px;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ url }) => {
    return `background-image:url(${url})`;
  }}
`;
