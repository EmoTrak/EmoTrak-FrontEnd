import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Flex from "../../../components/Flex";

const AdminNavbar = (): JSX.Element => {
  const nav = useNavigate();
  return (
    <Flex>
      <AdminPostBtn onClick={() => nav("/adminpost")}>post</AdminPostBtn>
      <AdminCommnetBtn onClick={() => nav("/admincomment")}>
        Comment
      </AdminCommnetBtn>
    </Flex>
  );
};

export default AdminNavbar;

const AdminPostBtn = styled.button`
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  background-color: transparent;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
const AdminCommnetBtn = styled.button`
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  background-color: transparent;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
