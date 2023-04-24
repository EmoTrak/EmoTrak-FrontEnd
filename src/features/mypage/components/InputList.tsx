import { PropsWithChildren } from "react";
import styled from "styled-components";
import { themeColor } from "../../../utils/theme";

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
  color: ${themeColor.main.red};
`;

const ListWrapper = styled.div`
  width: 30vw;
  display: flex;
  padding: 2rem 0px;
  border-bottom: 1px solid ${themeColor.main.gray};
  margin: 5px;
  position: relative;
`;

const ListTitle = styled.div`
  width: 7vw;
  font-size: 18px;
  display: flex;
  justify-content: center;
  font-weight: 800;
`;

const ListContent = styled.div`
  flex: 1 1 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5vw;
`;

export default InputList;
