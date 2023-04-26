import { InputListProps } from "../../../data/type/type";
import * as St from "../styles/InputListStyle";

function InputList({ name, children }: InputListProps) {
  return (
    <St.ListWrapper>
      <St.ListTitle>
        {name}
        <St.ListContent>{children}</St.ListContent>
      </St.ListTitle>
    </St.ListWrapper>
  );
}

export default InputList;
