import styled from "styled-components";
import { device, themeColor } from "../../../utils/theme";

export const SignupPageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
  ${device.tablet} {
    height: 120vh;
  }
  ${device.mobile} {
    height: 120vh;
  }
  ${device.miniMobile} {
    height: 120vh;
  }
`;

export const WarningMessage = styled.span`
  color: ${themeColor.main.red};
`;

export const SignFormContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vh;
`;
