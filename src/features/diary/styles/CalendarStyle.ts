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
  height: 100vh;
  ${device.tablet} {
    padding-left: 10px;
  }
  ${device.mobile} {
    padding-left: 5px;
    height: 90vh;
  }
  ${device.miniMobile} {
    padding-left: 5px;
    height: 60vh;
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
  top: 20px;
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
  height: 80%;
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
export const Day = styled.button`
  min-width: calc(100% / 7);
  display: flex;
  border: 0;
  font-size: 18px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: "KyoboHand";
  cursor: pointer;

  ${device.mobile} {
    font-size: 13px;
  }
`;

export const Sunday = styled.button`
  min-width: calc(100% / 7);
  border: 0;
  display: flex;
  font-size: 18px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  font-family: "KyoboHand";
  cursor: pointer;
  color: ${themeColor.palette.red};

  ${device.mobile} {
    font-size: 13px;
  }
`;
