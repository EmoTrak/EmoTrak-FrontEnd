import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  width: 40vw;
  padding: 4px;
  ${device.mobile} {
    width: 80vw;
  }
`;
export const EditInput = styled.textarea`
  width: 40vw;
  height: 50px;
  margin: 5px 0;
  padding: 10px;
  border: none;
  border-radius: 10px;
  resize: none;
  :focus {
    outline: none;
    border-color: ${themeColor.main.oatmeal};
    box-shadow: 0 0 10px ${themeColor.main.oatmeal};
  }
`;

export const Nicname = styled.div`
  color: ${themeColor.main.chocomilk};
  font-size: 15px;
`;
export const Comment = styled.div`
  margin: 5px 0;
`;

export const ReportBtn = styled.button`
  font-size: 30px;
  border: 0;
  background-color: transparent;
  color: ${themeColor.main.red};
`;

export const EditBox = styled.div`
  height: 122px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const DateBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
`;
