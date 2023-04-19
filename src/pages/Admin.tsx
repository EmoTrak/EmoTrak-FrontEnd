import React from "react";
import styled from "styled-components";
import AdminNavbar from "../features/admin/components/AdminNavbar";

const Admin = (): JSX.Element => {
  return (
    <Wrapper>
      <AdminNavbar />
    </Wrapper>
  );
};

export default Admin;

const Wrapper = styled.div`
  width: 100px;
  height: 100vh;
`;
