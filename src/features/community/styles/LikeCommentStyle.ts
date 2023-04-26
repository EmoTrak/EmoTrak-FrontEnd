import styled from "styled-components";
import { themeColor } from "../../../utils/theme";

export const LikeContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;
export const LikeTrue = styled.div`
  color: ${themeColor.main.red};
  font-size: 18px;
  display: flex;
  justify-content: center;

  cursor: pointer;
`;

export const LikeFalse = styled.div`
  color: ${themeColor.main.gray};
  font-size: 17px;
  display: contents;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

export const LikeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${themeColor.main.gray};
  font-size: 13px;
  margin-bottom: 5px;
`;
