import { useState } from "react";

const useEmoSelect = () => {
  const [emoSelect, setEmoSelect] = useState<boolean[]>(Array(6).fill(false));
  const [emoNum, setEmoNum] = useState("1,2,3,4,5,6");

  const clickEmojiHandler = (num: number): void => {
    const newEmoSelect = [...emoSelect];
    newEmoSelect[num] = !newEmoSelect[num];
    setEmoSelect(newEmoSelect);

    const newEmoNum = newEmoSelect
      .map((selected, index) => (selected ? index + 1 : null))
      .filter((x) => x !== null)
      .join(",");
    setEmoNum(newEmoNum);
  };

  if (!emoNum) {
    setEmoNum("1,2,3,4,5,6");
  }
  return { clickEmojiHandler, emoNum };
};

export default useEmoSelect;
