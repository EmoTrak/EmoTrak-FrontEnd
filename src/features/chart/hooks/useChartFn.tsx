import React, { useState } from "react";

import { date } from "../../../data/type/d1";

const useChartFn = () => {
  const today: date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };

  const [select, setSelect] = useState<date>({
    year: today.year,
    month: today.month,
    date: today.date,
  });


  const [isShow, setIsShow] = useState<boolean>(false);

  const ToggleHandler = () => {
    setIsShow((prev) => !prev);
  };

  const prevYear = () => {
    if (Number(select.year) > 2000) {
      return setSelect({ ...select, year: Number(select.year) + 1 });
    }
  };
  const nextYear = () => {
    if (Number(select.year) < 2200) {
      return setSelect({ ...select, year: Number(select.year) + 1 });

    }
  };
  const onMonthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.currentTarget;
    setSelect({ ...select, month: Number(button.value) });

    setIsShow((prev) => !prev);
  };

  return {
    prevYear,
    nextYear,
    month: select.month,
    isShow,
    onMonthClick,
    ToggleHandler,
    select,
    setSelect,
  };
};

export default useChartFn;
