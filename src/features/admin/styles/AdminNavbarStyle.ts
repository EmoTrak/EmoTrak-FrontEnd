import styled from "styled-components";
import { themeColor } from "../../../utils/theme";

export const AdminPostBtn = styled.button`
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  background-color: transparent;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: ${themeColor.main.gray};
  }
`;
export const AdminCommnetBtn = styled.button`
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  background-color: transparent;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: ${themeColor.main.gray};
  }
`;
