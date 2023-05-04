import { PropsWithChildren, createContext, useContext, useState } from "react";
import { BooleanType } from "../data/type/type";
import styled from "styled-components";
import { themeColor } from "../utils/theme";

const defaultValue = {
  open: false,
  setOpen: () => {},
};

const SubContext = createContext<BooleanType>(defaultValue);

export const SubModalroot = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <SubContext.Provider value={{ open, setOpen }}>
      {children}
    </SubContext.Provider>
  );
};

export const SubModalTrigger = ({ children }: PropsWithChildren) => {
  const { setOpen } = useContext(SubContext);
  return <div onClick={() => setOpen((pre) => !pre)}>{children}</div>;
};

export const SubModalContent = ({ children }: PropsWithChildren) => {
  const { open } = useContext(SubContext);
  return <>{open && <Content>{children}</Content>}</>;
};

const Content = styled.div`
  background-color: ${themeColor.main.white};
  border-radius: 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 11;
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
