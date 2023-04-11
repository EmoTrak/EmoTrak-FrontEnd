import { useState } from 'react';

const useEmoSelect = () => {
  const [emoSelect, setEmoSelect] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [emoNum, setEmonum] = useState('1,2,3,4,5,6');
  const newArr: any = [];

  const clickEmojiHandler = (num: number): void => {
    const value = emoSelect[num];
    const newlist = [...emoSelect];
    newlist.splice(num, 1, !value);
    setEmoSelect(newlist);
    newlist.map((e, index) => e && newArr.push(index + 1));
    setEmonum(newArr.join(','));
  };

  if (!emoNum) {
    setEmonum('1,2,3,4,5,6');
  }

  return { clickEmojiHandler, emoNum };
};

export default useEmoSelect;
