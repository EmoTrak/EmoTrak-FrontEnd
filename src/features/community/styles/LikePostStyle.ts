import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

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

export const LikeText = styled.div`
  color: ${themeColor.main.chocomilk};
  font-size: 15px;
  cursor: pointer;
  @media screen and (max-width: 400px) {
    display: none;
  }
`;
