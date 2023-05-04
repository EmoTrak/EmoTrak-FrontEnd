import { useEffect, useState } from "react";

const useEmoSelect = (paramEmo: string | null) => {
  const [emoSelect, setEmoSelect] = useState<boolean[]>(Array(6).fill(false));

  const changeEmo = () => {
    if (paramEmo) {
      const copySelect = Array(6).fill(false);
      paramEmo
        .split(",")
        .map((item) => copySelect.splice(Number(item) - 1, 1, true));
      setEmoSelect(copySelect);
    }
  };

  useEffect(() => {
    changeEmo();
  }, [paramEmo]);

  const [emoNum, setEmoNum] = useState(paramEmo);

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

  return { clickEmojiHandler, emoNum, emoSelect };
};

export default useEmoSelect;
