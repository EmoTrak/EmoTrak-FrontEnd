import styled from "styled-components";
import { device } from "../../../utils/theme";

export const Imoticon = styled.div`
  border-radius: 50%;
  width: 70%;
  margin-top: 10px;
  margin-left: 15%;
  position: absolute;
  z-index: 0;
  ${device.mobile} {
    margin-top: 13px;
    margin-left: 11%;
    width: 70%;
  }
`;
