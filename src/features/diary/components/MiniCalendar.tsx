import { DateType } from "../../../data/type/type";
import * as St from "../styles/MiniCalendarStyle";

const MiniCalendar = ({ year, month }: DateType) => {
  if (month === 13) {
    month = 1;
  } else if (month === 0) {
    month = 12;
  }

  const lastDate: number = new Date(year, month, 0).getDate();
  const firstDay: number = new Date(year, month - 1, 1).getDay();

  // 날짜 변환 함수
  const date = new Array(lastDate).fill(null).map(
    (e, i): DateType => ({
      year: year,
      month: month,
      date: i + 1,
      day: new Date(year, month - 1, i + 1).getDay(),
    })
  );
  return (
    <St.CalendarBox>
      <St.Month>{month}월</St.Month>

      <div>
        <St.Sunday>일</St.Sunday>
        <St.Day>월</St.Day>
        <St.Day>화</St.Day>
        <St.Day>수</St.Day>
        <St.Day>목</St.Day>
        <St.Day>금</St.Day>
        <St.Saturday>토</St.Saturday>
      </div>
      <St.DiaryDay>
        {new Array(firstDay).fill(null).map((e, i) => (
          <St.Day key={i}></St.Day>
        ))}
        {date.map((item) =>
          item.day === 0 ? (
            <St.Sunday key={item.date}>{item.date}</St.Sunday>
          ) : item.day === 6 ? (
            <St.Saturday key={item.date}>{item.date}</St.Saturday>
          ) : (
            <St.Day key={item.date}>{item.date}</St.Day>
          )
        )}
      </St.DiaryDay>
    </St.CalendarBox>
  );
};

export default MiniCalendar;
