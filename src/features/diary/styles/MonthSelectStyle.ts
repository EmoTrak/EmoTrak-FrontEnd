import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const Content = styled.div`
  position: absolute;
  top: 150%;
  height: 300px;
  width: 300px;
  color: ${themeColor.main.chocomilk};
  border-radius: 30px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 1px 1px 10px 5px ${themeColor.main.oatmeal};
  padding: 35px;
  display: flex;
  flex-direction: column;
  z-index: 5;
  ${device.mobile} {
    height: 250px;
    width: 250px;
    padding: 18px 25px;
  }
  ${device.miniMobile} {
    height: 200px;
    width: 200px;
    padding: 10px 20px;
  }
`;
export const Year = styled.div`
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  button {
    border: 0;
    background-color: transparent;
    margin: 5px;
    color: ${themeColor.main.chocomilk};
    cursor: pointer;
  }
`;

export const SelectMonth = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 40px;
  grid-gap: 15px;
  ${device.miniMobile} {
    margin-top: 20px;
    grid-gap: 0px;
  }
`;

export const ClickBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: transparent;
  font-family: "KyoboHand";
  font-size: 20px;
  border: 0;
  color: ${themeColor.main.chocomilk};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    background-color: ${themeColor.main.oatmeal};
    color: ${themeColor.main.white};
    font-weight: 800;
  }
`;

export const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${themeColor.main.chocomilk};
  font-size: 25px;
`;
