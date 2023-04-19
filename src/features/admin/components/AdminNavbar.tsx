import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Flex from "../../../components/Flex";
import { ADMIN_COMMENT, ADMIN_POST } from "../../../data/routes/urls";

const AdminNavbar = (): JSX.Element => {
  const nav = useNavigate();
  return (
    <Flex>
      <AdminPostBtn onClick={() => nav(`${ADMIN_POST}`)}>post</AdminPostBtn>
      <AdminCommnetBtn onClick={() => nav(`${ADMIN_COMMENT}`)}>
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
