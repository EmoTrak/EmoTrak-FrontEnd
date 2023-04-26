import styled from "styled-components";

import { device, themeColor } from "../../../utils/theme";

export const Wrapper = styled.div`
  height: 55vh;
  width: 30vw;
  text-align: center;
  margin-top: 50px;

  background-color: ${themeColor.main.white};
  box-shadow: 10px 5px 5px ${themeColor.main.gray};
  border-radius: 25px;
  h2 {
    letter-spacing: 5px;
  }
  ${device.mobile} {
    height: 100vh;
    width: 70vw;
  }
`;
