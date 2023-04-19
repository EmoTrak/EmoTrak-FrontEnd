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
  margin-top: 130px;
  margin-bottom: 10px;
  position: relative;
`;
export default Layout;
