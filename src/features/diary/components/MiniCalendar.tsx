import styled from "styled-components";
import { date } from "../../../data/type/d1";
import { themeColor } from "../../../utils/theme";

const MiniCalendar = ({ year, month }: date) => {
  if (month === 13) {
    month = 1;
  } else if (month === 0) {
    month = 12;
  }

  const lastDate: number = new Date(year, month, 0).getDate();
  const firstDay: number = new Date(year, month - 1, 1).getDay();

  // 날짜 변환 함수
  const date = new Array(lastDate).fill(null).map(
    (e, i): date => ({
      year: year,
      month: month,
      date: i + 1,
      day: new Date(year, month - 1, i + 1).getDay(),
    })
  );
  return (
    <CalendarBox>
      <div>{month}월</div>

      <div>
        <Sunday>일</Sunday>
        <Day>월</Day>
        <Day>화</Day>
        <Day>수</Day>
        <Day>목</Day>
        <Day>금</Day>
        <Saturday>토</Saturday>
      </div>
      <DiaryDay>
        {new Array(firstDay).fill(null).map((e, i) => (
          <Day key={i}></Day>
        ))}
        {date.map((item) =>
          item.day === 0 ? (
            <Sunday key={item.date}>{item.date}</Sunday>
          ) : item.day === 6 ? (
            <Saturday key={item.date}>{item.date}</Saturday>
          ) : (
            <Day key={item.date}>{item.date}</Day>
          )
        )}
      </DiaryDay>
    </CalendarBox>
  );
};

const CalendarBox = styled.div`
  width: 200px;
  margin: 50px 0 0 3vw;
`;

const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 150px;
`;

const Day = styled.button`
  min-width: calc(100% / 7);
  border: 0;
  background-color: transparent;
  font-family: "KyoboHand";
`;

const Sunday = styled.button`
  min-width: calc(100% / 7);
  border: 0;
  background-color: transparent;
  font-family: "KyoboHand";
  color: ${themeColor.main.red};
`;

const Saturday = styled.button`
  min-width: calc(100% / 7);
  border: 0;
  background-color: transparent;
  font-family: "KyoboHand";
  color: ${themeColor.palette.blue};
`;

export default MiniCalendar;
