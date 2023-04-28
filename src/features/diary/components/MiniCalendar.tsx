import { DateType } from "../../../data/type/type";
import { useDate } from "../hooks/useDate";
import Flex from "../../../components/Flex";
import * as St from "../styles/MiniCalendarStyle";

const MiniCalendar = ({ year, month, onClick }: DateType & { onClick: () => void }) => {
  if (month === 13) {
    month = 1;
  } else if (month === 0) {
    month = 12;
  }

  const { firstDay, date } = useDate(year, month);

  return (
    <St.CalendarBox onClick={onClick}>
      <St.Month>{month}월</St.Month>

      <Flex row>
        <St.Day day={0}>일</St.Day>
        <St.Day>월</St.Day>
        <St.Day>화</St.Day>
        <St.Day>수</St.Day>
        <St.Day>목</St.Day>
        <St.Day>금</St.Day>
        <St.Day day={6}>토</St.Day>
      </Flex>
      <St.DiaryDay>
        {new Array(firstDay).fill(null).map((_, i) => (
          <St.Day key={i}></St.Day>
        ))}
        {date.map((item) => (
          <St.Day key={item.date} day={item.day}>
            {item.date}
          </St.Day>
        ))}
      </St.DiaryDay>
    </St.CalendarBox>
  );
};

export default MiniCalendar;
