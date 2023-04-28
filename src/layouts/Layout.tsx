import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import * as St from "../layouts/LayoutStyle";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <St.Container>{children}</St.Container>
      <Footer />
    </>
  );
};

export default Layout;
