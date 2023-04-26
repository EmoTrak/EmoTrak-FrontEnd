import styled from "styled-components";
import { themeColor } from "../../../utils/theme";

export const LikeTrue = styled.div`
  color: ${themeColor.main.red};
  font-size: 30px;
  display: contents;
  cursor: pointer;
`;

export const LikeFalse = styled.div`
  color: ${themeColor.main.chocomilk};
  font-size: 30px;
  display: contents;
  cursor: pointer;
`;

export const LikeCount = styled.div`
  color: ${themeColor.main.chocomilk};
  font-size: 15px;
`;
