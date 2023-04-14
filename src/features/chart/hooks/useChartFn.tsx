import React, { useState } from "react";
import { IOption } from "../../../data/type/d2";

const useChartFn = () => {
  const options: IOption[] = [
    { value: "1", month: "1월" },
    { value: "2", month: "2월" },
    { value: "3", month: "3월" },
    { value: "4", month: "4월" },
    { value: "5", month: "5월" },
    { value: "6", month: "6월" },
    { value: "7", month: "7월" },
    { value: "8", month: "8월" },
    { value: "9", month: "9월" },
    { value: "10", month: "10월" },
    { value: "11", month: "11월" },
    { value: "12", month: "12월" },
  ];

  let date = new Date();
  const [year] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<string | number>(date.getMonth() + 1);
  const [firstIndex, setFirstIndex] = useState<number>(date.getMonth() - 1);
  const [isShow, setIsShow] = useState(false);

  const ClickOption = (optionValue: string) => {
    setMonth(optionValue);
  };
  const onMonthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.currentTarget;
    setMonth(button.value);
    setIsShow((prev) => !prev);
  };
  const onPrevClick = () => {
    setFirstIndex((prevIndex) =>
      prevIndex === 0 ? options.length - 3 : prevIndex - 1
    );
  };

  const onNextClick = () => {
    setFirstIndex((prevIndex) =>
      prevIndex === options.length - 3 ? 0 : prevIndex + 1
    );
  };
  const onModalLayoutClick = () => {
    if (isShow) {
      setIsShow((prev) => !prev);
    }
  };
  return {
    month,
    firstIndex,
    isShow,
    ClickOption,
    onMonthClick,
    onPrevClick,
    onNextClick,
    onModalLayoutClick,
    year,
    options,
    setIsShow,
  };
};

export default useChartFn;
