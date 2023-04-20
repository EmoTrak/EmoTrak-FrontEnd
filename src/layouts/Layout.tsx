import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 130px;
  margin-bottom: 10px;
  min-height: 90vh;
  position: relative;
`;
export default Layout;
