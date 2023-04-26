import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

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

export const Day = styled.button`
  min-width: calc(100% / 7);
  border: 0;
  background-color: transparent;
  font-family: "KyoboHand";
  color: #767676;
`;

export const Sunday = styled.button`
  min-width: calc(100% / 7);
  border: 0;
  background-color: transparent;
  font-family: "KyoboHand";
  color: ${themeColor.main.red};
`;

export const Saturday = styled.button`
  min-width: calc(100% / 7);
  border: 0;
  background-color: transparent;
  font-family: "KyoboHand";
  color: ${themeColor.palette.blue};
`;
