import { InputListProps } from "../data/type/type";
import * as St from "../features/mypage/styles/InputListStyle";

function InputList({ name, children }: InputListProps) {
  return (
    <St.ListWrapper>
      <St.ListTitle>{name} </St.ListTitle>
      <St.ListContent>{children}</St.ListContent>
    </St.ListWrapper>
  );
}

export default InputList;
