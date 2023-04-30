import styled from "styled-components";
import { device } from "../../../utils/theme";

export const PaletteWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 180px;
  ${device.mobile} {
    margin-top: 15px;
  }
`;

export const PaletteColor = styled.div`
  width: 45px;
  height: 45px;
  cursor: pointer;
  margin-right: 0;
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
  }
`;
