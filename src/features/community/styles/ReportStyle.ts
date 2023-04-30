import styled from "styled-components";
import { themeColor } from "../../../utils/theme";

export const Container = styled.div`
  width: 300px;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  background-color: ${themeColor.main.white};
  border-radius: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 5px ${themeColor.main.oatmeal};
  cursor: auto;
  height: 250px;
`;

export const Text = styled.div`
  padding-bottom: 10px;
`;

export const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
`;

export const ReportForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const ReportInput = styled.textarea`
  padding: 10px;
  border-radius: 10px;
  resize: none;
  font-family: "KyoboHand";
  letter-spacing: 1.5px;
  font-size: 18px;
  border: 0;
  box-shadow: 0 0 10px ${themeColor.main.oatmeal};
  outline: none !important;
  width: 200px;
  height: 50px;
`;

export const ReportIcon = styled.div`
  font-size: 28px;
  display: contents;
  color: ${themeColor.main.red};
  cursor: pointer;
`;

export const ReportText = styled.span`
  color: ${themeColor.main.red};
  cursor: pointer;
`;
