import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Test>{children}</Test>
      <Footer />
    </>
  );
};

const Test = styled.div`
  min-height: 90vh;
  margin-top: 13vh;
  margin-bottom: 1vh;
`;
export default Layout;
