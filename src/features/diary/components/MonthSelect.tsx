import React, { PropsWithChildren } from "react";
import * as UI from "../../../components/Modal";
import styled from "styled-components";
import { DateSelectType } from "../../../data/type/d1";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const MonthSelect = ({
  children,
  select,
  setSelect,
}: PropsWithChildren & DateSelectType) => {
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <UI.Modalroot>
      <UI.ModalTrigger>{children}</UI.ModalTrigger>
      <UI.ModalContent top={18} left={38}>
        <Content>
          <UI.ModalClose>
            <CloseBtn>
              <IoMdClose />
            </CloseBtn>
          </UI.ModalClose>
          <Year>
            <button onClick={() => setSelect({ ...select, year: select.year - 1 })}>
              <AiOutlineLeft />
            </button>

            {select.year}
            <button onClick={() => setSelect({ ...select, year: select.year + 1 })}>
              <AiOutlineRight />
            </button>
          </Year>
          <SelectMonth>
            {month.map((_, i) => (
              <UI.ModalClose>
                <ClickBtn onClick={() => setSelect({ ...select, month: i + 1 })}>
                  {i + 1}
                </ClickBtn>
              </UI.ModalClose>
            ))}
          </SelectMonth>
        </Content>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};
const Content = styled.div`
  top: 10%;
  height: 300px;
  width: 300px;
  color: #a18585;
  border-radius: 30px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 5px #e2e2e2;
  padding: 10%;
  display: flex;
  flex-direction: column;
`;
const Year = styled.div`
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  button {
    border: 0;
    background-color: transparent;
    margin: 5px;
    color: #a18585;
    cursor: pointer;
  }
`;

const SelectMonth = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 40px;
  grid-gap: 25px;
`;

const ClickBtn = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  font-family: "KyoboHand";
  font-size: 18px;
  border: 0;
  color: #a18585;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    background-color: #e5dfd3;
    color: white;
    font-weight: 800;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #a18585;
  font-size: 25px;
`;
export default MonthSelect;
