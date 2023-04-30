import styled from "styled-components";
import { themeColor } from "../../../utils/theme";

export const SignupPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: ${themeColor.main.white};
`;

export const SignFormContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vh;
`;
