import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode[];
  row?: boolean;
  gap?: number;
  jc?: string;
  ai?: string;
};

const Flex = ({ children, ...restProps }: Props) => {
  return <StyledStack {...restProps}>{children}</StyledStack>;
};

const StyledStack = styled.div<Props>`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  gap: ${({ gap }) => `${gap}px`};
  justify-content: ${({ jc }) => `${jc}`};
  align-items: ${({ ai }) => `${ai}`};
`;

export default Flex;
