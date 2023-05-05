import styled, { css } from "styled-components";
import { device, themeColor } from "../../../utils/theme";
import { IToggle } from "../../../data/type/type";

export const ChartWrap = styled.div`
  display: flex;
  gap: 50px;
  h1 {
    margin: 0;
  }
  ${device.mobile} {
    display: none;
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

export const ContentWrapper = styled.div`
  margin-top: 50px;
  width: 100vw;
  height: 100vh;
`;
export const EmoList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  ${device.tablet} {
    display: none;
  }
`;

export const CheckBoxWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  h3 {
    margin-top: 5px;
  }
`;

export const Container = styled.div`
  margin-top: 50px;
  width: 100vw;
  height: 100vh;
`;

export const MobileWrapper = styled.header`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100vw;
  ${device.mobile} {
    display: flex;
    overflow: hidden;
  }
`;

export const ToggleBtn = styled.button<IToggle>`
  width: 65px;
  height: 30px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${({ isActive }) =>
    !isActive ? "none" : `${themeColor.main.chocomilk}`};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;
export const Circle = styled.div<IToggle>`
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${({ isActive }) =>
    isActive &&
    css`
      transform: translate(35px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;
