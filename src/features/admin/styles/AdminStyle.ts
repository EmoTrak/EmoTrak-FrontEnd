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
  cursor: pointer;
  &:hover {
    background-color: ${themeColor.main.gray};
  }
`;

export const AdminBtn = styled.button`
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
