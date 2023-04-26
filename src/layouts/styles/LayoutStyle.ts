import styled from "styled-components";
import { device, themeColor } from "../utils/theme";

const MenuButton = styled.div`
  display: none;
  font-size: 25px;
  color: ${themeColor.main.chocomilk};
  ${device.mobile} {
    display: contents;
  }
`;

const Content = styled.div`
  display: none;
  ${device.mobile} {
    position: fixed;
    top: 90px;
    left: 0;
    background-color: ${themeColor.main.oatmeal};
    box-shadow: 3px 3px 5px ${themeColor.main.oatmeal};
    border-radius: 0 0 5% 5%;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 100px;
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 3%;
    box-sizing: border-box;
  }
`;

const SelectButton = styled.div`
  background-color: ${themeColor.main.white};
  width: 75px;
  height: 75px;
  border-radius: 25%;
  color: ${themeColor.main.chocomilk};
  box-shadow: 1px 1px 5px ${themeColor.main.chocomilk};
  padding: 2%;
  box-sizing: border-box;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectText = styled.div`
  ${device.mobile} {
    color: ${themeColor.main.coffemilk};
    font-size: 15px;
    margin-top: 5px;
  }
`;
