import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Sidebar from "./Sidebar";
import Flex from "../../../components/Flex";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";
import { date } from "../../../data/type/d1";
import CalendarEmo from "./CalendarEmo";
import MiniCalendar from "./MiniCalendar";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Calendar = (): JSX.Element => {
  const [side, setSide] = useState(false);
  const today: date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };

  // 날짜 선택
  const [select, setSelect] = useState<date>({
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
    (_, i): date => ({
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

  if (isError) {
    return <>에러..</>;
  }

  return (
    <Container>
      <Flex jc="center" ai="center">
        <MiniCalendar year={select.year} month={select.month - 1} />
        <MiniCalendar year={select.year} month={select.month + 1} />
      </Flex>
      <CalendarBox>
        <CalendarWrap>
          <NowMonth onClick={thisMonth}>이번달</NowMonth>
          <CalendarBtn>
            <button onClick={prevMonth}>
              <AiOutlineLeft />
            </button>
            <h2>
              {select.year}년 {select.month}월
            </h2>
            <button onClick={nextMonth}>
              <AiOutlineRight />
            </button>
          </CalendarBtn>
        </CalendarWrap>
        <TotalWeek>
          <Day>일</Day>
          <Day>월</Day>
          <Day>화</Day>
          <Day>수</Day>
          <Day>목</Day>
          <Day>금</Day>
          <Day>토</Day>
        </TotalWeek>
        <DiaryDay>
          {new Array(firstDay).fill(null).map((e, i) => (
            <Day key={i}></Day>
          ))}
          {date.map((item) =>
            item.year < today.year ? (
              <Day key={item.date} onClick={() => clickDayBtn(Number(item.date))}>
                {item.date}
                <CalendarEmo data={data} item={item} today={today} />
              </Day>
            ) : item.year === today.year && item.month < today.month ? (
              <Day key={item.date} onClick={() => clickDayBtn(Number(item.date))}>
                {item.date}
                <CalendarEmo data={data} item={item} today={today} />
              </Day>
            ) : item.year === today.year &&
              item.month === today.month &&
              Number(item.date) <= Number(today.date) ? (
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

      {side ? (
        <>
          <Sidebar side={side} setSide={setSide} data={data} diaryDay={select} />
          <SideImg> 여기에 이미지가 들어갑니다.</SideImg>
        </>
      ) : (
        <SideImg> 여기에 이미지가 들어갑니다.</SideImg>
      )}
    </Container>
  );
};

const CalendarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const CalendarBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 2vw;
    height: 5vh;
  }
`;
const Container = styled.div`
  display: flex;
  background-color: #fff;
`;
const NowMonth = styled.div`
  margin-top: 10px;
  border-radius: 10px;
  background-color: #e5dfd3;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 5vw;
  height: 3vh;
  cursor: pointer;
`;
const CalendarBox = styled.div`
  width: 50vw;
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
  display: flex;
  justify-content: center;
`;

const Day = styled.button`
  min-width: calc(100% / 7);
  display: flex;
  border: 0;
  font-size: 18px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: "KyoboHand";
  cursor: pointer;
`;

const SideImg = styled.div`
  width: 27vw;
  height: 100vh;
`;

export default Calendar;
