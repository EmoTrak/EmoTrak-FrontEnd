import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const Container = styled.div`
  display: flex;
  background-color: ${themeColor.main.white};
  ${device.tablet} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const SelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const CalendarBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const NowDay = styled.div`
  margin: 15px;
  display: flex;
  justify-content: center;
  position: relative;
  span {
    font-size: 21px;
    z-index: 3;
  }
  p {
    background-color: ${themeColor.emoticon.yellow};
    border-radius: 10px;
    width: 115px;
    height: 16px;
    position: absolute;
    top: 5px;
    z-index: 2;
  }
`;

export const SelectBtn = styled.button`
  position: absolute;
  right: -35px;
  border: 0;
  background-color: transparent;
  font-size: 20px;
  color: ${themeColor.main.coffemilk};
  cursor: pointer;
`;

export const CalendarBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 850px;
  height: 100vh;
  ${device.tablet} {
    width: 95vw;
  }
  ${device.mobile} {
    height: 85vh;
  }
  ${device.miniMobile} {
    height: 70vh;
  }
`;

export const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  ${device.mobile} {
    max-height: 65%;
  }
`;
export const TotalWeek = styled.div`
  min-width: calc(100% / 7);
  display: flex;
`;

export const Weeks = styled.div<{ day?: number }>`
  min-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  border: 0;
  font-size: 15px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: "KyoboHand";
  color: ${({ day }) =>
    day === 0
      ? themeColor.main.red
      : day === 6
      ? themeColor.emoticon.blue
      : themeColor.font};
  ${device.mobile} {
    font-size: 13px;
  }
`;
export const Day = styled.button<{ day?: number }>`
  width: calc(100% / 7);
  height: 15vh;
  display: flex;
  border: 0;
  font-size: 18px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: inherit;
  cursor: pointer;
  color: ${({ day }) =>
    day === 0
      ? themeColor.main.red
      : day === 6
      ? themeColor.emoticon.blue
      : themeColor.font};
  ${device.mobile} {
    font-size: 13px;
    height: 11vh;
  }
  ${device.miniMobile} {
    height: 8vh;
  }
`;

export const MiniCalendarWrap = styled.div`
  position: absolute;
  width: 20vw;
  max-width: 280px;
  @media screen and (max-width: 1320px) {
    display: none;
  }
`;
