import React, { useState } from "react";

import styled from "styled-components";
import Sidebar from "./Sidebar";
import Flex from "../../../components/Flex";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";
import { date } from "../../../data/type/d1";
import CalendarEmo from "./CalendarEmo";

const Calendar = (): JSX.Element => {
  const today: date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };
  const weeks: string[] = ["일", "월", "화", "수", "목", "금", "토"];

  // 날짜 선택
  const [select, setSelectMonth] = useState<date>({
    year: today.year,
    month: today.month,
  });

  const lastDate: number = new Date(select.year, select.month, 0).getDate();
  const firstDay: number = new Date(select.year, select.month - 1, 1).getDay();

  const [diaryDay, setDiaryDay] = useState<date>({
    year: select.year,
    month: select.month,
    date: today.date,
  });

  const [side, setSide] = useState(false);

  //해당 요일의 값 가져오는 함수
  const clickDayBtn = (day: number): void => {
    setSide(true);
    setDiaryDay({ ...diaryDay, date: day });
  };

  // 날짜 변환 함수
  const date = new Array(lastDate).fill(null).map(
    (e, i): date => ({
      year: select.year,
      month: select.month,
      date: i + 1,
      day: new Date(select.year, select.month - 1, i + 1).getDay(),
    })
  );

  const prevMonth = (): void => {
    select.month === 1
      ? setSelectMonth({ month: 12, year: select.year - 1 })
      : setSelectMonth({ ...select, month: select.month - 1 });
  };

  const nextMonth = (): void => {
    select.month === 12
      ? setSelectMonth({ month: 1, year: select.year + 1 })
      : setSelectMonth({ ...select, month: select.month + 1 });
  };

  const thisMonth = (): void => {
    setSelectMonth({ year: today.year, month: today.month });
  };

  const { data, isLoading } = useQuery({
    queryKey: [keys.GET_DIARY, select],
    queryFn: async () => {
      const data = await user.get("/daily", { params: select });
      return data.data.data;
    },
  });

  return (
    <Flex row>
      <CalendarBox>
        <button onClick={prevMonth}>이전달</button>
        <h1>
          {select.year}년 {select.month}월
        </h1>
        <button onClick={nextMonth}>다음달</button>
        <button onClick={thisMonth}>이번달</button>

        <TotalWeek>
          {weeks.map(
            (v: string): JSX.Element => (
              <TotalWeek key={v}>{v}</TotalWeek>
            )
          )}
        </TotalWeek>
        <DiaryDay>
          {new Array(firstDay).fill(null).map((e, i) => (
            <Day key={i}></Day>
          ))}
          {date.map((item) =>
            // 이번달
            item.year === today.year &&
            item.month === today.month &&
            Number(item.date) <= Number(today.date) ? (
              <Day key={item.date} onClick={() => clickDayBtn(Number(item.date))}>
                {item.date}
                <CalendarEmo data={data} item={item} today={today} />
              </Day>
            ) : item.year === today.year &&
              item.month === today.month &&
              Number(item.date) > Number(today.date) ? (
              <Day key={item.date}>{item.date}</Day>
            ) : item.year <= today.year && item.month <= today.month ? (
              // 이전달
              <Day key={item.date} onClick={() => clickDayBtn(Number(item.date))}>
                {item.date}
                <CalendarEmo data={data} item={item} today={today} />
              </Day>
            ) : (
              <Day key={item.date}>{item.date}</Day>
            )
          )}
        </DiaryDay>
      </CalendarBox>
      {side && <Sidebar side={side} setSide={setSide} data={data} diaryDay={diaryDay} />}
    </Flex>
  );
};

const CalendarBox = styled.div`
  width: 60vw;
  border: 1px solid;
  margin-left: auto;
  margin-right: auto;
`;

const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 40vw;
`;
const TotalWeek = styled.div`
  min-width: calc(100% / 7);
  border: 1px solid;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Day = styled.button`
  min-width: calc(100% / 7);
  display: flex;
  box-sizing: border-box;
  border: 0;
  background-color: transparent;
`;

export default Calendar;
