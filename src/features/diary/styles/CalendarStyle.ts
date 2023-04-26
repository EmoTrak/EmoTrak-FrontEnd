import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

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
export const Container = styled.div`
  display: flex;
  background-color: ${themeColor.main.white};
  height: 100%;
  ${device.tablet} {
    justify-content: center;
    align-items: center;
  }
`;

export const NowDay = styled.div`
  margin: 15px;
  display: flex;
  justify-content: center;
  span {
    font-size: 21px;
    position: relative;
    z-index: 3;
  }
  p {
    background-color: ${themeColor.emoticon.yellow};
    border-radius: 10px;
    width: 115px;
    height: 16px;
    position: absolute;
    top: 10px;
    z-index: 2;
  }
`;

export const SelectBtn = styled.button`
  position: absolute;
  top: 18px;
  border: 0;
  background-color: transparent;
  font-size: 20px;
  color: ${themeColor.main.coffemilk};
  cursor: pointer;
`;

export const CalendarBox = styled.div`
  margin-left: auto;
  margin-right: auto;

  ${device.mobile} {
    margin-left: 0px;
    margin-right: 3px;
  }
`;

export const DiaryDay = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50vw;
  ${device.tablet} {
    width: 90vw;
  }
  ${device.mobile} {
    max-height: 65%;
  }
`;
export const TotalWeek = styled.div`
  min-width: calc(100% / 7);
  display: flex;
`;

export const Weeks = styled.div`
  min-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  border: 0;
  font-size: 15px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: "KyoboHand";

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
  color: ${({ day }) => (day === 0 ? "red" : day === 6 ? "blue" : "black")};
  ${device.mobile} {
    font-size: 13px;
    height: 11vh;
  }
  ${device.miniMobile} {
    height: 8vh;
  }
`;
