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
  const [isShow, setIsShow] = useState<boolean>(false);

  const [firstIndex, setFirstIndex] = useState<number>(date.getMonth() - 1);

  const ClickOption = (optionValue: string) => {
    setMonth(optionValue);
  };
  const ToggleHandler = () => {
    setIsShow((prev) => !prev);
  };

  const prevMonth = () => {
    if (Number(month) > 1) {
      return setMonth(Number(month) - 1);
    }
  };
  const nextMonth = () => {
    if (Number(month) < 12) {
      return setMonth(Number(month) + 1);
    }
  };
  
  const onMonthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.currentTarget;
    setMonth(button.value);
    setIsShow((prev) => !prev);
  };
  return {
    month,
    firstIndex,
    isShow,
    ToggleHandler,
    setMonth,
    ClickOption,
    prevMonth,
    nextMonth,
    onMonthClick,
    setIsShow,
    year,
    options,
  };
};

export default useChartFn;
