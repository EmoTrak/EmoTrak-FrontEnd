import React from "react";
import styled from "styled-components";

const Header = (): JSX.Element => {
  return <StHeader>Header</StHeader>;
};

const StHeader = styled.div`
  width: 100%;
  height: 147px;
  border: 1px solid;
  position: sticky;
  z-index: 10;
  top: 0px;
  left: 0px;
  background-color: white;
`;

export default Header;
