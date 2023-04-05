import React, { useState } from 'react';
import { date } from '../../../data/type/d1';
import styled from 'styled-components';
import Flex from '../../../components/Flex';
import Sidebar from './Sidebar';

const Calendar = (): JSX.Element => {
  const date = new Date();
  const today: date = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
  };
  const weeks: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  // 날짜 선택
  const [select, setSelectMonth] = useState<date>({
    year: today.year,
    month: today.month,
  });
  const dateCount: number = new Date(select.year, select.month, 0).getDate();

  const [diaryDay, setDiaryDay] = useState<date>({
    year: select.year,
    month: select.month,
    day: today.day,
  });

  const [side, setSide] = useState(false);

  //해당 요일의 값 가져오는 함수
  const dateSelect = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setSide(true);
    const btn = e.target as HTMLButtonElement;
    setDiaryDay({ ...diaryDay, day: Number(btn.value) });
  };

  //요일 반환 함수
  const returnWeek = (): JSX.Element[] => {
    const weekArr: JSX.Element[] = [];
    weeks.map((v: string): void => {
      console.log(v);
      weekArr.push(<TotalWeek key={v}>{v}</TotalWeek>);
    });
    return weekArr;
  };

  // 날짜 변환 함수
  const returnDay = (): JSX.Element[] => {
    const dayArr: JSX.Element[] = [];
    const days: number = new Date(select.year, select.month - 1, 1).getDay();

    for (const nowDay of weeks) {
      if (weeks[days] === nowDay) {
        for (let i = 1; i <= dateCount; i++) {
          const day: number = new Date(select.year, select.month - 1, i).getDay();
          today.year === select.year && today.month === select.month && today.day === i
            ? dayArr.push(
                <Today value={i} key={`today-${i}`} onClick={dateSelect}>
                  {i}
                </Today>
              )
            : day === 0
            ? dayArr.push(
                <Sunday value={i} key={`sunday-${i}`} onClick={dateSelect}>
                  {i}
                </Sunday>
              )
            : day === 6
            ? dayArr.push(
                <Saturday value={i} key={`saturday-${i}`} onClick={dateSelect}>
                  {i}
                </Saturday>
              )
            : dayArr.push(
                <Day value={i} key={`day-${i}`} onClick={dateSelect}>
                  {i}
                </Day>
              );
        }
        break;
      } else {
        dayArr.push(<Day key={nowDay}></Day>);
      }
    }
    return dayArr;
  };

  const prevMonth = (): void => {
    select.month === 1
      ? setSelectMonth({ ...select, month: 12, year: select.year - 1 })
      : setSelectMonth({ ...select, month: select.month - 1 });
  };

  const nextMonth = (): void => {
    select.month === 12
      ? setSelectMonth({ ...select, month: 1, year: select.year + 1 })
      : setSelectMonth({ ...select, month: select.month + 1 });
  };

  const thisMonth = (): void => {
    setSelectMonth({ year: today.year, month: today.month });
  };

  return (
    <Container>
      <CalendarBox>
        <button onClick={prevMonth}>이전달</button>
        <h1>
          {select.year}년 {select.month}월
        </h1>
        <button onClick={nextMonth}>다음달</button>
        <button onClick={thisMonth}>이번달</button>

        <DiaryDay>
          {returnWeek()}
          {returnDay()}
        </DiaryDay>
      </CalendarBox>
      {side && <Sidebar side={side} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const CalendarBox = styled.div`
  width: 60vw;
  border: 1px solid;
  /* height: 70vw; */
  margin-left: auto;
  margin-right: auto;
`;

const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 50vw;
  background-color: aliceblue;
  border: 1px solid;
`;
const TotalWeek = styled.div`
  min-width: calc(100% / 7);
  height: 5vw;
  border: 1px solid;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Day = styled.button`
  min-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;
const Sunday = styled.button`
  color: red;
  min-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;
const Saturday = styled.button`
  color: blue;
  min-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

const Today = styled.button`
  color: #fc1efc;
  min-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;
export default Calendar;
