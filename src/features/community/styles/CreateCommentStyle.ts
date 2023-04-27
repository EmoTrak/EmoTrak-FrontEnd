import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const CommentInput = styled.textarea`
  margin: 5px 0 5px 0;
  padding: 10px;
  border-radius: 10px;
  resize: none;
  font-family: "KyoboHand";
  letter-spacing: 1.5px;
  font-size: 18px;
  border: 0;
  color: inherit;
  box-shadow: 0 0 10px ${themeColor.main.oatmeal};
  outline: none !important;
  width: 40vw;
  height: 80px;
  ${device.mobile} {
    width: 80vw;
    height: 60px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
`;
