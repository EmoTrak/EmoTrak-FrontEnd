import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { FlexType } from "../data/type/type";

const Flex = ({
  children,
  ...restProps
}: Partial<FlexType> & PropsWithChildren) => {
  return <StyledStack {...restProps}>{children}</StyledStack>;
};

const StyledStack = styled.div<Partial<FlexType>>`
  display: flex;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  gap: ${({ gap }) => `${gap}px`};
  justify-content: ${({ jc }) => `${jc}`};
  align-items: ${({ ai }) => `${ai}`};
`;

export default Flex;
