import { createGlobalStyle } from "styled-components";
import { themeColor } from "../utils/theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${themeColor.main.paper};
    font-family: 'KyoboHand';
    letter-spacing: 1px;
  }
  @font-face {
    font-family: 'KyoboHand';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/KyoboHand.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  @font-face {
  font-family: "yg-jalnan";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff")
  format("woff");
  font-weight: normal;
  font-style: normal;
  }

  @font-face {
  font-family: "Pretendard-Regular";
  src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
  format("woff");
  font-weight: 400;
  font-style: normal;
}
`;
export default GlobalStyle;
