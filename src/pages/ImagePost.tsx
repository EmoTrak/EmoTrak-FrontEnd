import React, { useCallback, useEffect, useRef, useState } from "react";
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
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { device, themeColor } from "../utils/theme";
export type StPreviewProps = {
  url: string;
};
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

  const { submitDiaryHandler, fileInputHandler, fileDropHandler, photo } = usePost({
    inputValue,
  });
  const { preview, previewUrl } = usePreview();

  // 별점
  const [clicked, setClicked] = useState<boolean[]>([false, false, false, false, false]);
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

  const dropHandler = useCallback((event: React.DragEvent<HTMLLabelElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    fileDropHandler(event);
    setValidPhoto(true);
  }, []);

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    if (validPhoto && validEmoji && validStar) {
      submitDiaryHandler(event);
    } else {
      event.preventDefault();
      alert("내용을 모두 입력해주세요!");
    }
  };

  const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValidPhoto(true);
    fileInputHandler(event);
  };

  const changeStarHandler = (score: number): void => {
    clickStarHandler(score);
    setValidStar(true);
  };

  const changeEmojiHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
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
        <Wrapper>
          <MobileStarWrap>
            {[1, 2, 3, 4, 5].map((score) => (
              <Star
                key={score}
                size="5vw"
                color={
                  clicked[score - 1] ? themeColor.palette.yellow : themeColor.main.oatmeal
                }
                onClick={() => changeStarHandler(score)}
              />
            ))}
          </MobileStarWrap>
          <ImageWrap>
            {validPhoto ? (
              <StPhotoPreview url={`${previewUrl}`}>
                <StDeletePhotoButton type="button" onClick={deletePhotoHandler}>
                  삭제
                </StDeletePhotoButton>
              </StPhotoPreview>
            ) : (
              <StPhotoInputContainer>
                <StPhotoInputBox>
                  <label ref={dragRef} onDragOver={dragOverHandler} onDrop={dropHandler}>
                    <StPhotoInput
                      type="file"
                      accept="image/jpeg image/png image/jpg image/gif"
                      onChange={changeFileHandler}
                      required
                    />
                  </label>
                </StPhotoInputBox>
              </StPhotoInputContainer>
            )}
          </ImageWrap>
          <ImagePostWrap>
            <StCanvasWrapper>
              <StScoreBox>
                <StUnorderLi>
                  {[1, 2, 3, 4, 5, 6].map((item: number) => (
                    <StList key={item}>
                      <StEmoButton
                        name="emoId"
                        type="button"
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
                <StarWrap>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <Star
                      key={score}
                      size="2vw"
                      color={
                        clicked[score - 1]
                          ? themeColor.palette.yellow
                          : themeColor.main.oatmeal
                      }
                      onClick={() => changeStarHandler(score)}
                    />
                  ))}
                  <p>{inputValue.star === 0 ? "?" : inputValue.star}</p>
                </StarWrap>
              </StScoreBox>
              <div>
                <label>
                  <StTextArea
                    name="detail"
                    required
                    spellCheck={false}
                    maxLength={1500}
                    onChange={onChangeHandler}
                  ></StTextArea>
                </label>
              </div>
              <StSubmitBox>
                <StLabel>
                  공유여부
                  <Checkbox
                    name="share"
                    checked={inputValue.share === true}
                    disabled={editItem?.restrict}
                    onChange={onCheckHandler}
                  />
                </StLabel>
                <Button size="large" type="submit">
                  등록하기
                </Button>
              </StSubmitBox>
            </StCanvasWrapper>
          </ImagePostWrap>
        </Wrapper>
      </form>
    </>
  );
};

export default ImagePost;

export const MobileStarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  ${device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;
const ImagePostWrap = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    width: 100%;
    height: 50%;
    p {
      display: none;
    }
  }
`;
const ImageWrap = styled.div`
  width: 50vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    width: 100%;
    height: 50%;
    margin: 0;
  }
`;
export const StarWrap = styled.div`
  display: flex;
  ${device.mobile} {
    display: none;
  }
`;
export const StPhotoInputBox = styled.li`
  width: 40vw;
  height: 70vh;
  position: relative;
  border: 1px solid ${themeColor.main.paper};
  background: ${themeColor.main.oatmeal};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${themeColor.main.gray};
  font-size: 1rem;
  border-radius: 30px;
  margin-right: 1rem;

  ::before {
    content: "드래그 또는 파일을 선택하여 사진을 첨부해주세요";
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 30px;
    width: 40vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    font-size: 1.2vw;
  }

  ${device.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85vw;
    height: 50vh;
    margin: 0;
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

export const StPhotoPreview = styled.div<StPreviewProps>`
  width: 45vw;
  height: 70vh;
  border-radius: 30px;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  ${device.mobile} {
    position: unset;
    border-radius: 20px;
    width: 80vw;
    height: 50vh;
    padding: 20px;
    margin: 0;
  }
  ${({ url }) => {
    return `background-image:url(${url})`;
  }}
`;

export const StDeletePhotoButton = styled.button`
  width: 4vw;
  height: 2vw;
  border: 3px solid ${themeColor.main.coffemilk};
  border-radius: 10px;
  margin: 20px;
  background-color: ${themeColor.main.oatmeal};
  color: ${themeColor.main.chocomilk};
  font-family: inherit;
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: ${themeColor.main.coffemilk};
    color: ${themeColor.main.white};
    border: 3px solid ${themeColor.main.oatmeal};
  }
  ${device.mobile} {
    width: 10vw;
    height: 6vw;
    margin: 0;
  }
`;

export const StScoreBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 45vw;
  ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
  ${device.mobile} {
    display: flex;
    flex-direction: column;
  }
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

  ${device.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    width: 80vw;
    height: 50vh;
    padding: 20px;
    margin: 0;
  }
`;

export const StSubmitBox = styled.div`
  width: 40vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${device.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60vw;
    height: 50vh;
  }
`;

export const StPhotoInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    width: 100vw;
  }
`;

export const StLabel = styled.label`
  font-size: 1vw;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  ${device.mobile} {
    width: 50vw;
    font-size: 25px;
  }
  /* @media screen and (max-width: 320px) {
    width: 100vw;
    font-size: 25px;
  } */
`;
