import styled from "styled-components";
import { themeColor } from "../../../utils/theme";

export const Wrapper = styled.div`
  height: 100vh;
`;

export const Table = styled.table`
  width: 100%;
  height: 100px;
  justify-content: space-between;
  td {
    text-align: center;
  }
`;
export const Tbody = styled.tbody`
  margin: 100px;
`;
export const H1 = styled.h1`
  text-align: center;
`;
export const BackBtn = styled.button`
  background-color: transparent;
  border: 1px solid ${themeColor.main.gray};
  margin: 30px;
  width: 30px;
  height: 30px;
  &:hover {
    background-color: ${themeColor.main.gray};
  }
`;

export const PageWrap = styled.div`
  display: flex;
  justify-content: center;
`;
