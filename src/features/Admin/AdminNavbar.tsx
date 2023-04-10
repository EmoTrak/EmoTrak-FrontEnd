import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Flex from "../../components/Flex";

const AdminNavbar = (): JSX.Element => {
  const nav = useNavigate();
  return (
    <Flex>
      <AdminUserBtn onClick={() => nav("/adminuser")}>user</AdminUserBtn>
      <AdminPostBtn onClick={() => nav("/adminpost")}>post</AdminPostBtn>
    </Flex>
  );
};

export default AdminNavbar;

const AdminUserBtn = styled.button`
  border-radius: 5px;
  border: 1px solid lightgray;
  background-color: transparent;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
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
