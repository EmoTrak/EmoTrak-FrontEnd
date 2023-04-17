import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "../features/imagepost/components/Image";
import { StCanvasWrapper } from "../features/post/components/Canvas";
import { InputValue, StEmoButton, StList, StUnorderLi } from "./DrawingPost";
import Star from "../components/Icon/Star";
import { useInput } from "../features/post/hooks/useInput";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { useNavigate, useParams } from "react-router-dom";
import { usePost } from "../features/post/hooks/usePost";
import styled from "styled-components";
import { usePreview } from "../features/post/hooks/usePreview";
import Flex from "../components/Flex";
import { getCookie } from "../utils/cookies";
import { LOGIN_PAGE } from "../data/routes/urls";
import Checkbox from "../components/Checkbox";

const ImagePost = (): JSX.Element => {
  const token = getCookie("token");
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

  // 감정 선택
  // const emoIds: number[] = [1, 2, 3, 4, 5, 6];

  // 별점
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  // const starArray: number[] = [1, 2, 3, 4, 5];
  const clickStarHandler = (index: number): void => {
    setClicked(clicked.map((_, i) => i <= index - 1));
    scoreStarHandler(index);
  };

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
    if (!token) {
      navigate(`${LOGIN_PAGE}`);
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
  }, [token, photo]);

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <Flex row>
          <StCanvasWrapper>
            {validPhoto ? (
              <StPhotoPreview url={`${previewUrl}`}>
                <StDeletePhotoButton type="button" onClick={deletePhotoHandler}>
                  삭제
                </StDeletePhotoButton>
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
          </StCanvasWrapper>

          <StCanvasWrapper>
            <StScoreBox>
              <StUnorderLi style={{ display: "flex", flexDirection: "row" }}>
                {[1, 2, 3, 4, 5, 6].map((item: number) => (
                  <StList key={item}>
                    <StEmoButton
                      name="emoId"
                      type="button"
                      // {inputValue.emoId ===item ? "selected" : null}
                      selected={inputValue.emoId === item ? true : false}
                      value={item}
                      onClick={changeEmojiHandler}
                    >
                      <EmotionIcons
                        height="50"
                        width="50vw"
                        emotionTypes={`EMOTION_${item}`}
                      />
                    </StEmoButton>
                  </StList>
                ))}
              </StUnorderLi>
              {[1, 2, 3, 4, 5].map((score) => (
                <Star
                  key={score}
                  size="2vw"
                  color={clicked[score - 1] ? "#FFDC82" : "#E5DFD3"}
                  onClick={() => changeStarHandler(score)}
                />
              ))}
              <p>{inputValue.star === 0 ? "?" : inputValue.star}</p>
            </StScoreBox>
            <div>
              <label>
                <StTextArea
                  name="detail"
                  // cols={30}
                  // rows={10}
                  required
                  maxLength={1500}
                  onChange={onChangeHandler}
                ></StTextArea>
              </label>
            </div>
            <StSubmitBox>
              <label>
                공유여부
                {/* <input
                  name="share"
                  type="checkbox"
                  checked={inputValue.share === true}
                  disabled={editItem?.restrict}
                  onChange={onCheckHandler}
                /> */}
                <Checkbox
                  name="share"
                  checked={inputValue.share === true}
                  disabled={editItem?.restrict}
                  onChange={onCheckHandler}
                />
              </label>
              <button type="submit">등록하기</button>
            </StSubmitBox>
          </StCanvasWrapper>
        </Flex>
      </form>
    </>
  );
};

export default ImagePost;

// export const StCanvasWrapper = styled.div`
//   width: 50%;
//   height: 80vh;
//   /* border: 1px solid; */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   overflow: scroll;
// `;

export const StPhotoInputBox = styled.li`
  width: 50vw;
  height: 80vh;
  position: relative;
  border: 1px solid rgb(230, 229, 239);
  background: #e5dfd3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(155, 153, 169);
  font-size: 1rem;
  margin-right: 1rem;

  ::before {
    content: "드래그 또는 파일을 선택하여 사진을 첨부해주세요";
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 40vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
  width: 45vw;
  height: 70vh;
  border-radius: 30px;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  ${({ url }) => {
    return `background-image:url(${url})`;
  }}
`;

export const StDeletePhotoButton = styled.button`
  width: 2.5vw;
  height: 1.5vw;
  border: 3px solid #d0bd95;
  border-radius: 10px;
  margin: 20px;
  background-color: #e5dfd3;
  color: #ae9898;
  font-family: inherit;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: #d0bd95;
    color: #ffffff;
    border: 3px solid #e5dfd3;
  }
`;

export const StScoreBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 45vw;
  height: 10vh;
`;

export const StTextArea = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  width: 41vw;
  height: 50vh;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 2vh;
  font-family: inherit;
  line-height: 2;
  margin: 20px;
  padding: 10px;
`;

export const StSubmitBox = styled.div`
  width: 40vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
