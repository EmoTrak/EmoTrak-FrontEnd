import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { device } from "../utils/theme";

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
  ${device.mobile} {
    min-height: 70vh;
  }
  ${device.miniMobile} {
    margin-top: 110px;
  }
`;
export default Layout;
