import React, { PropsWithChildren, createContext, useContext, useState } from "react";
import { BooleanType, Position } from "../data/type/d1";
import styled from "styled-components";

const defaultValue = {
  open: false,
  setOpen: () => {},
};

const SubContext = createContext<BooleanType>(defaultValue);

export const SubModalroot = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  return <SubContext.Provider value={{ open, setOpen }}>{children}</SubContext.Provider>;
};

export const SubModalTrigger = ({ children }: PropsWithChildren) => {
  const { setOpen } = useContext(SubContext);
  return <div onClick={() => setOpen((pre) => !pre)}>{children}</div>;
};

export const SubModalContent = ({
  children,
  top,
  left,
}: PropsWithChildren & Position) => {
  const { open } = useContext(SubContext);
  return (
    <>
      {open && (
        <Content top={top} left={left}>
          {children}
        </Content>
      )}
    </>
  );
};

const Content = styled.div<Position>`
  background-color: #ffffff;
  position: fixed;
  top: ${({ top }) => top}%;
  border-radius: 30px;
  left: ${({ left }) => left}%;
  box-sizing: border-box;
`;

export const SubModalClose = ({ children }: PropsWithChildren) => {
  const { setOpen } = useContext(SubContext);

  return <CloseBtn onClick={() => setOpen((pre) => !pre)}>{children}</CloseBtn>;
};

const CloseBtn = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  font-size: 25px;
`;
