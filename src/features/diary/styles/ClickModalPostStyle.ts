import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const PostContent = styled.div`
  width: 380px;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 50%);
  color: ${themeColor.main.chocomilk};
  background-color: ${themeColor.main.white};
  border-radius: 22px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 5px ${themeColor.main.oatmeal};
  padding: 60px 20px 40px;
  cursor: auto;
  ${device.mobile} {
    width: 300px;
  }
`;
export const Text = styled.div`
  padding-bottom: 10%;
  color: ${themeColor.main.chocomilk};
`;

export const ClickBtn = styled.div`
  background-color: ${themeColor.main.oatmeal};
  border-radius: 22px;
  display: flex;
  justify-content: center;
  padding: 10% 15%;
  margin: 2%;
  cursor: pointer;
  ${device.mobile} {
    padding: 10% 13%;
  }
`;

export const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
