import { createGlobalStyle } from "styled-components";
import { themeColor } from "../utils/theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${themeColor.main.paper};
    font-family: 'KyoboHand';
    letter-spacing: 1px;
    color:${themeColor.font};
  }
  
  @font-face {
    font-family: 'KyoboHand';
    src: url('/fonts/KyoboHand.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
  @font-face {
  font-family: "yg-jalnan";
  src: url("/fonts/JalnanOTF00.woff")
  format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
  }

  @font-face {
  font-family: "Pretendard-Regular";
  src: url("/fonts/Pretendard-Regular.woff")
  format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;
export default GlobalStyle;
