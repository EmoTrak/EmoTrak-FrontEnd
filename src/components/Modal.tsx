import React, { createContext, useContext, useState } from "react";
import { BooleanType, PropsType } from "../data/type/d1";
import styled from "styled-components";

const defaultValue = {
  open: false,
  setOpen: (open: boolean) => {},
};

const Context = createContext<BooleanType>(defaultValue);

export const Modalroot = ({ children }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  return <Context.Provider value={{ open, setOpen }}>{children}</Context.Provider>;
};

export const ModalTrigger = ({ children }: PropsType) => {
  const { setOpen } = useContext(Context);
  return <div onClick={() => setOpen(true)}>{children}</div>;
};

export const ModalBackground = () => {
  const { open } = useContext(Context);
  return <>{open && <Background />}</>;
};

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const ModalContent = ({ children }: PropsType) => {
  const { open } = useContext(Context);
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

export const ModalClose = ({ children }: PropsType) => {
  const { setOpen } = useContext(Context);

  return <CloseBtn onClick={() => setOpen(false)}>{children}</CloseBtn>;
};

const CloseBtn = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 25px;
`;
