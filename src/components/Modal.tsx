import React, { createContext, useContext, useState } from 'react';
import { BooleanType, PropsType } from '../data/type/d1';
import styled from 'styled-components';

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

export const ModalClose = () => {
  const { setOpen } = useContext(Context);

  return <CloseBtn onClick={() => setOpen(false)}>✖️</CloseBtn>;
};

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: 0;
  background-color: transparent;
  font-size: 25px;
`;
