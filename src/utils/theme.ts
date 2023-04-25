import { DefaultTheme } from "styled-components";

export const themeColor: DefaultTheme = {
  emoticon: {
    yellow: "#FEEC96",
    pink: "#F89790",
    purple: "#C78EC0",
    blue: "#8789C2",
    sky: "#73C7EE",
    green: "#84C99D",
  },
  palette: {
    yellow: "#FED400",
    red: "#F67269",
    purple: "#D67DCC",
    blue: "#787BCA",
    sky: "#5DC0ED",
    green: "#3AC66D",
  },
  main: {
    yellow: "#FDF9D2",
    oatmeal: "#E5DFD3",
    paper: "#F4F2EE",
    chocomilk: "#AE9898",
    coffemilk: "#D0BD95",
    pink: "#F89790",
    red: "#F67269",
    gray: "#D9D9D9",
    white: "#FFFFFF",
    black: "#000000",
  },
  landing: {
    yellow: "#FBF3CC",
    white: "#FFFFFF",
    orange: "#FDE5A7",
  },
};

export const device = {
  miniMobile: `@media screen and (max-width: 500px)`,
  mobile: `@media screen and (max-width: 767px)`,
  tablet: `@media screen and (max-width: 1024px)`,
};
