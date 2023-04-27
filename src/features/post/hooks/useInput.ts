import { useState } from "react";
import { InputValue } from "../../../data/type/type";

export const useInput = (initialValue: InputValue) => {
  const [inputValue, setInputValue] = useState<InputValue>(initialValue);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setInputValue({
      ...inputValue,
      [name]: checked,
    });
  };

  const clickEmojiHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    // currentTarget으로 버튼의 value 가져오기. if target -> img 값이 가져와짐
    const button = event.currentTarget as HTMLButtonElement;
    const emoId = Number(button.value);
    setInputValue({ ...inputValue, emoId: emoId });
  };

  const scoreStarHandler = (star: number): void => {
    setInputValue({ ...inputValue, star });
  };

  return {
    onChangeHandler,
    onCheckHandler,
    clickEmojiHandler,
    inputValue,
    setInputValue,
    scoreStarHandler,
  };
};
