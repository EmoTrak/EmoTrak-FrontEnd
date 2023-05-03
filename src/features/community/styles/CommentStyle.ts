import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  width: 40vw;
  padding: 4px;
  ${device.mobile} {
    width: 100%;
  }
`;

export const Nicname = styled.div`
  color: ${themeColor.main.chocomilk};
  font-size: 15px;
`;
export const Comment = styled.pre`
  margin: 5px 10px 5px 0;
  line-height: 20px;
  white-space: pre-wrap;
`;

export const ReportBtn = styled.button`
  font-size: 20px;
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

export const EditAndDeleteBox = styled.div`
  min-width: 108px;
`;
