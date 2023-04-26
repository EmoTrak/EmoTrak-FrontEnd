import { InputListProps } from "../../../data/type/type";
import * as St from "../styles/InputListStyle";

function InputList({ important, name, children }: InputListProps) {
  return (
    <St.ListWrapper>
      <St.ListTitle>
        {name}
        {important ? <St.Aster>*</St.Aster> : null}
      </St.ListTitle>
      <St.ListContent>{children}</St.ListContent>
    </St.ListWrapper>
  );
}

export default InputList;
