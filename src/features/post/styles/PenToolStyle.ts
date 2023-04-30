import styled from "styled-components";
import { ButtonSize } from "../../../data/type/type";
import { themeColor } from "../../../utils/theme";

export const ButtonBox = styled.div<ButtonSize>`
  height: ${({ size }) => `${size + 10}px`};
  width: ${({ size }) => `${size + 10}px`};
  margin: 5px;
  border: 0;
  background-color: ${({ color }) => `${color}`};
  border: 1px solid ${themeColor.main.gray};
  border-radius: 50%;
`;
