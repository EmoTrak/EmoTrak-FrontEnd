import React, { PropsWithChildren } from "react";
import styled from "styled-components";

type InputListProps = {
  important?: boolean;
  name: string;
} & PropsWithChildren;

function InputList({ important, name, children }: InputListProps) {
  return (
    <ListWrapper>
      <ListTitle>
        {name}
        {important ? <StAster>*</StAster> : null}
      </ListTitle>
      <ListContent>{children}</ListContent>
    </ListWrapper>
  );
}

const StAster = styled.span`
  color: red;
`;

const ListWrapper = styled.div`
  width: 30vw;
  display: flex;
  padding: 2rem 0px;
  border-bottom: 1px solid rgb(220, 219, 228);
  margin: 1vw;
  position: relative;
`;

const ListTitle = styled.div`
  width: 10vw;
  font-size: 18px;
`;

const ListContent = styled.div`
  flex: 1 1 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1vw;
`;

export default InputList;
