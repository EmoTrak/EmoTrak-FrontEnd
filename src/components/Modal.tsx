import { PropsWithChildren, createContext, useContext, useState } from "react";
import { BooleanType } from "../data/type/type";
import styled from "styled-components";
import { themeColor } from "../utils/theme";

const defaultValue = {
  open: false,
  setOpen: () => {},
};

const Context = createContext<BooleanType>(defaultValue);

export const Modalroot = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  return <Context.Provider value={{ open, setOpen }}>{children}</Context.Provider>;
};

export const ModalTrigger = ({ children }: PropsWithChildren) => {
  const { setOpen } = useContext(Context);
  return <Trigger onClick={() => setOpen((pre) => !pre)}>{children}</Trigger>;
};

const Trigger = styled.div`
  display: contents;
`;

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

export const ModalContent = ({ children }: PropsWithChildren) => {
  const { open } = useContext(Context);
  return <>{open && <Content>{children}</Content>}</>;
};

const Content = styled.div`
  background-color: ${themeColor.main.white};
  border-radius: 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
`;

export const ModalClose = ({ children }: PropsWithChildren) => {
  const { setOpen } = useContext(Context);

  return <CloseBtn onClick={() => setOpen((pre) => !pre)}>{children}</CloseBtn>;
};

const CloseBtn = styled.div`
  border: 0;
  cursor: pointer;
`;
