import { DateType } from "../data/type/type";

export const getDate = (year: number, month: number) => {
  const lastDate: number = new Date(year, month, 0).getDate();
  const firstDay: number = new Date(year, month - 1, 1).getDay();

  // 날짜 변환 함수
  const date = new Array(lastDate).fill(null).map(
    (_, i): DateType => ({
      year: year,
      month: month,
      date: i + 1,
      day: new Date(year, month - 1, i + 1).getDay(),
    })
  );

  return { firstDay, date };
};
