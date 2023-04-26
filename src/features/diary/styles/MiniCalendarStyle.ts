import styled from "styled-components";
import { device } from "../../../utils/theme";

export const CalendarBox = styled.div`
  width: 200px;
  margin: 50px 0 0 3vw;
  color: #767676;
  ${device.tablet} {
    display: none;
  }
`;

export const Month = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
`;
export const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 150px;
`;

export const Day = styled.div<{ day?: number }>`
  min-width: calc(100% / 7);
  color: ${({ day }) => (day === 0 ? "red" : day === 6 ? "blue" : "#767676")};
  font-size: 12px;
`;
