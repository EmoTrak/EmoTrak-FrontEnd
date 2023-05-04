import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { DateType } from "../data/type/type";
import { useDate } from "../features/diary/hooks/useDate";
import { useGetDiary } from "../features/diary/hooks/useGetDiary";
import Button from "../components/Button";
import Sidebar from "../features/diary/components/Sidebar";
import CalendarEmo from "../features/diary/components/CalendarEmo";
import MiniCalendar from "../features/diary/components/MiniCalendar";
import MonthSelect from "../features/diary/components/MonthSelect";
import * as St from "../features/diary/styles/CalendarStyle";
import { scrollOnTop } from "../utils/scollOnTop";

const Home = () => {
  const [side, setSide] = useState(false);
  const today: DateType = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };

  // 날짜 선택
  const [select, setSelect] = useState<DateType>({
    year: today.year,
    month: today.month,
    date: today.date,
  });

  const { firstDay, date } = useDate(select.year, select.month);
  const { diary } = useGetDiary(select.year, select.month);

  //해당 날짜의 값 가져오는 함수
  const clickDayBtn = (day: number): void => {
    setSide(true);
    setSelect({ ...select, date: day });
  };

  const prevMonth = (): void => {
    select.month === 1
      ? setSelect({ ...select, month: 12, year: select.year - 1 })
      : setSelect({ ...select, month: select.month - 1 });
  };

  const nextMonth = (): void => {
    select.month === 12
      ? setSelect({ ...select, month: 1, year: select.year + 1 })
      : setSelect({ ...select, month: select.month + 1 });
  };

  const thisMonth = (): void => {
    setSelect({ ...select, year: today.year, month: today.month });
  };

  useEffect(() => {
    scrollOnTop();
  }, []);

  return (
    <St.Container>
      {!side && (
        <St.MiniCalendarWrap>
          <MiniCalendar year={select.year} month={select.month - 1} onClick={prevMonth} />
          <MiniCalendar year={select.year} month={select.month + 1} onClick={nextMonth} />
        </St.MiniCalendarWrap>
      )}
      <St.CalendarBox>
        <St.SelectWrap>
          <St.NowDay>
            <span>
              {select.year}년 {select.month}월
            </span>
            <p />
            <MonthSelect select={select} setSelect={setSelect}>
              <St.SelectBtn>
                <MdOutlineArrowDropDownCircle />
              </St.SelectBtn>
            </MonthSelect>
          </St.NowDay>

          <St.CalendarBtn>
            <Button icon size="x-small" onClick={prevMonth}>
              <AiOutlineLeft />
            </Button>
            <Button size="x-small" onClick={thisMonth}>
              오늘
            </Button>
            <Button icon size="x-small" onClick={nextMonth}>
              <AiOutlineRight />
            </Button>
          </St.CalendarBtn>
        </St.SelectWrap>
        <St.TotalWeek>
          <St.Weeks day={0}>SUN</St.Weeks>
          <St.Weeks>MON</St.Weeks>
          <St.Weeks>TUE</St.Weeks>
          <St.Weeks>WED</St.Weeks>
          <St.Weeks>THU</St.Weeks>
          <St.Weeks>FRI</St.Weeks>
          <St.Weeks day={6}>SAT</St.Weeks>
        </St.TotalWeek>
        <St.DiaryDay>
          {Array(firstDay)
            .fill(null)
            .map((_, i) => (
              <St.Day key={i} disabled></St.Day>
            ))}
          {date.map((item) => {
            if (
              today.year < item.year ||
              (today.year === item.year && today.month < item.month) ||
              (today.year === item.year &&
                today.month === item.month &&
                Number(item.date) > Number(today.date))
            ) {
              return (
                <St.Day key={item.date} day={item.day}>
                  {item.date}
                </St.Day>
              );
            } else {
              return (
                <St.Day
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                  day={item.day}
                >
                  {item.date}
                  <CalendarEmo data={diary} item={item} today={today} />
                </St.Day>
              );
            }
          })}
        </St.DiaryDay>
      </St.CalendarBox>

      {side && <Sidebar side={side} setSide={setSide} data={diary} diaryDay={select} />}
    </St.Container>
  );
};

export default Home;
