import React, { useState } from "react";
import styled from "styled-components";
import { date } from "../../../data/type/d1";

const MiniCalendar = ({ year, month }: date) => {
  // 날짜 선택
  const select: date = {
    year: year,
    month: month,
  };

  const lastDate: number = new Date(select.year, select.month, 0).getDate();
  const firstDay: number = new Date(select.year, select.month - 1, 1).getDay();

  // 날짜 변환 함수
  const date = new Array(lastDate).fill(null).map(
    (e, i): date => ({
      year: select.year,
      month: select.month,
      date: i + 1,
      day: new Date(select.year, select.month - 1, i + 1).getDay(),
    })
  );
  return (
    <CalendarBox>
      <div>{select.month}월</div>

      <div>
        <Sunday>일</Sunday>
        <Day>월</Day>
        <Day>화</Day>
        <Day>수</Day>
        <Day>목</Day>
        <Day>금</Day>
        <Day>토</Day>
      </div>
      <DiaryDay>
        {new Array(firstDay).fill(null).map((e, i) => (
          <Day key={i}></Day>
        ))}
        {date.map((item) =>
          item.day === 0 ? (
            <Sunday key={item.date}>{item.date}</Sunday>
          ) : (
            <Day key={item.date}>{item.date}</Day>
          )
        )}
      </DiaryDay>
    </CalendarBox>
  );
};

const CalendarBox = styled.div`
  width: 15vw;
  margin: 15px 15px 100px;
`;

const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 10vw;
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
  color: red;
`;

export default MiniCalendar;
