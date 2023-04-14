import React, { createContext, useContext, useState } from "react";
import { BooleanType, PropsType } from "../data/type/d1";
import styled from "styled-components";

const defaultValue = {
  open: false,
  setOpen: () => {},
};

const SubContext = createContext<BooleanType>(defaultValue);

export const SubModalroot = ({ children }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  return <SubContext.Provider value={{ open, setOpen }}>{children}</SubContext.Provider>;
};

export const SubModalTrigger = ({ children }: PropsType) => {
  const { setOpen } = useContext(SubContext);
  return <div onClick={() => setOpen((pre) => !pre)}>{children}</div>;
};

export const SubModalContent = ({ children }: PropsType) => {
  const { open } = useContext(SubContext);
  return <>{open && <Content>{children}</Content>}</>;
};

const Content = styled.div`
  background-color: #ffffff;
  position: fixed;
  top: 30%;
  border-radius: 30px;
  left: 30%;
  box-sizing: border-box;
`;

export const SubModalClose = ({ children }: PropsType) => {
  const { setOpen } = useContext(SubContext);

  return <CloseBtn onClick={() => setOpen((pre) => !pre)}>{children}</CloseBtn>;
};

const CloseBtn = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 25px;
`;
