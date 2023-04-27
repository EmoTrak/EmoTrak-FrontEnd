import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const SelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  h1 {
    margin: 0;
  }
`;
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
`;

export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${themeColor.main.gray};
  margin-top: 10px;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: ${themeColor.main.white};
    box-shadow: 1px 3px 3px 1px ${themeColor.main.black};
    transition: 0.2s;
  }
`;

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: ${themeColor.main.chocomilk};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
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
