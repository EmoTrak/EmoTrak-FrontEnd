import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Flex from "../../../components/Flex";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";
import { DateType } from "../../../data/type/type";
import CalendarEmo from "./CalendarEmo";
import MiniCalendar from "./MiniCalendar";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MonthSelect from "./MonthSelect";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import Button from "../../../components/Button";
import * as St from "../styles/CalendarStyle";

const Calendar = () => {
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

  const lastDate: number = new Date(select.year, select.month, 0).getDate();
  const firstDay: number = new Date(select.year, select.month - 1, 1).getDay();

  //해당 날짜의 값 가져오는 함수
  const clickDayBtn = (day: number): void => {
    setSide(true);
    setSelect({ ...select, date: day });
  };

  // 날짜 변환 함수
  const date = new Array(lastDate).fill(null).map(
    (_, i): DateType => ({
      year: select.year,
      month: select.month,
      date: i + 1,
      day: new Date(select.year, select.month - 1, i + 1).getDay(),
    })
  );

  const prevMonth = (): void => {
    select.month === 1
      ? setSelect({ month: 12, year: select.year - 1 })
      : setSelect({ ...select, month: select.month - 1 });
  };

  const nextMonth = (): void => {
    select.month === 12
      ? setSelect({ month: 1, year: select.year + 1 })
      : setSelect({ ...select, month: select.month + 1 });
  };

  const thisMonth = (): void => {
    setSelect({ year: today.year, month: today.month });
  };

  const { data, isError } = useQuery({
    queryKey: [keys.GET_DIARY, select.year, select.month],
    queryFn: async () => {
      const data = await user.get("/daily", {
        params: { year: select.year, month: select.month },
      });
      return data.data.data;
    },
  });

  return (
    <St.Container>
      <Flex ai="center">
        <MiniCalendar year={select.year} month={select.month - 1} />
        <MiniCalendar year={select.year} month={select.month + 1} />
      </Flex>
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
          <St.Weeks style={{ color: "red" }}>SUN</St.Weeks>
          <St.Weeks>MON</St.Weeks>
          <St.Weeks>TUE</St.Weeks>
          <St.Weeks>WED</St.Weeks>
          <St.Weeks>THU</St.Weeks>
          <St.Weeks>FRI</St.Weeks>
          <St.Weeks>SAT</St.Weeks>
        </St.TotalWeek>
        <St.DiaryDay>
          {new Array(firstDay).fill(null).map((e, i) => (
            <St.Day key={i}></St.Day>
          ))}
          {date.map((item) => {
            // 전년도일때
            if (item.year < today.year && item.day === 0) {
              return (
                <St.Sunday
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </St.Sunday>
              );
            } else if (item.year < today.year) {
              return (
                <St.Day
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </St.Day>
              );
            }
            // 올해 && 이전달일때
            else if (
              item.year === today.year &&
              item.month < today.month &&
              item.day === 0
            ) {
              return (
                <St.Sunday
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </St.Sunday>
              );
            } else if (item.year === today.year && item.month < today.month) {
              return (
                <St.Day
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </St.Day>
              );
            }
            // 이번달 오늘까지
            else if (
              item.year === today.year &&
              item.month === today.month &&
              Number(item.date) <= Number(today.date) &&
              item.day === 0
            ) {
              return (
                <St.Sunday
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </St.Sunday>
              );
            } else if (
              item.year === today.year &&
              item.month === today.month &&
              Number(item.date) <= Number(today.date)
            ) {
              return (
                <St.Day
                  key={item.date}
                  onClick={() => clickDayBtn(Number(item.date))}
                >
                  {item.date}
                  <CalendarEmo data={data} item={item} today={today} />
                </St.Day>
              );
            } else if (item.day === 0) {
              return <St.Sunday key={item.date}>{item.date}</St.Sunday>;
            } else {
              return <St.Day key={item.date}>{item.date}</St.Day>;
            }
          })}
        </St.DiaryDay>
      </St.CalendarBox>

      {side && (
        <Sidebar side={side} setSide={setSide} data={data} diaryDay={select} />
      )}
    </St.Container>
  );
};

export default Calendar;
