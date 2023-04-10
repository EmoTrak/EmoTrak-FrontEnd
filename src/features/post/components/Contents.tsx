import React, { useState } from "react";
import styled from "styled-components";
import { useInput } from "../hooks/useInput";
import { InputValue } from "../../../pages/DrawingPost";
import { StCanvasWrapper } from "./Canvas";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import Star from "../../../components/Icon/Star";

export type ContentProps = {
  newItem: InputValue;
};

const Contents = ({ newItem }: ContentProps) => {
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

  //   console.log("newItem = ", newItem);
  //   console.log("contents - inputvalue", inputValue);

  return (
    <>
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
              color={clicked[score - 1] ? "#FFDC82" : "#E5DFD3"}
              onClick={() => clickStarHandler(score)}
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
              onChange={onChangeHandler}
            ></textarea>
          </label>
        </div>
      </StCanvasWrapper>
    </>
  );
};

export default Contents;

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
