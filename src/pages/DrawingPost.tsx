import React, { useState } from "react";
import Flex from "../components/Flex";
import Canvas, { StCanvasWrapper } from "../features/post/components/Canvas";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Star from "../components/Icon/Star";
import { useInput } from "../features/post/hooks/useInput";

export type InputValue = {
  image: File | null;
  year: number;
  month: number;
  day: number;
  emoId: number;
  star: number;
  detail: string;
  deleteImg: boolean;
  share: boolean;
};

const DrawingPost = (): JSX.Element => {
  const params = useParams();
  // const date = params.date.split("-")
  // const year = date[0]
  // const month = date[1]
  // const day = date[2]
  const newItem: InputValue = {
    image: null,
    year: 0,
    month: 0,
    day: 0,
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

  console.log(inputValue);

  return (
    <>
      <form>
        <Flex row gap={10}>
          <Canvas width={800} height={700} />
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
                  fill={clicked[score - 1] ? "#FFDC82" : "#E5DFD3"}
                  stroke={clicked[score - 1] ? "#FFDC82" : "#E5DFD3"}
                  onClick={() => clickStarHandler(score)}
                />
              ))}
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
                  onChange={onChangeHandler}
                ></textarea>
              </label>
            </div>
          </StCanvasWrapper>
        </Flex>
      </form>
    </>
  );
};

export default DrawingPost;

const StList = styled.li`
  list-style-type: none;
`;

const StUnorderLi = styled.ul`
  gap: 20px;
`;

const StEmoButton = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  /* align-items: center; */
`;
