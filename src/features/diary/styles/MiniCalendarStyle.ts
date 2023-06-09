import styled from "styled-components";
import { themeColor } from "../../../utils/theme";

export const CalendarBox = styled.div`
  /* height: 30vh; */
  left: 0;
  margin: 50px 0 0 2vw;
  color: #767676;
`;

export const Month = styled.div`
  margin-bottom: 10px;
`;
export const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 28vh;
  max-height: 300px;
`;

export const Day = styled.div<{ day?: number }>`
  min-width: calc(100% / 7);
  color: ${({ day }) =>
    day === 0
      ? themeColor.main.red
      : day === 6
      ? themeColor.emoticon.blue
      : themeColor.font};
  font-size: 12px;
`;
