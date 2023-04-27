import styled from "styled-components";
import { device } from "../../../utils/theme";

export const PaletteWrap = styled.div`
  display: flex;
  ${device.mobile} {
    margin-top: 15px;
  }
`;

export const PaletteColor = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 50%;
  ${device.tablet} {
    width: 25px;
    height: 25px;
  }
  ${device.mobile} {
    width: 30px;
    height: 30px;
  }
  ${device.miniMobile} {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;
