import { PropsWithChildren } from "react";
import * as UI from "../../../components/Modal";
import styled from "styled-components";
import { DateSelectType } from "../../../data/type/d1";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { device, themeColor } from "../../../utils/theme";

const MonthSelect = ({
  children,
  select,
  setSelect,
}: PropsWithChildren & DateSelectType) => {
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <UI.Modalroot>
      <UI.ModalTrigger>{children}</UI.ModalTrigger>
      <UI.ModalContent>
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
              <UI.ModalClose key={i}>
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
  transform: translate(-70%, 10%);
  position: absolute;
  height: 300px;
  width: 300px;
  color: ${themeColor.main.chocomilk};
  border-radius: 30px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 1px 1px 10px 5px ${themeColor.main.oatmeal};
  padding: 35px;
  display: flex;
  flex-direction: column;
  z-index: 5;
  ${device.mobile} {
    height: 250px;
    width: 250px;
    padding: 18px 25px;
  }
`;
const Year = styled.div`
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  button {
    border: 0;
    background-color: transparent;
    margin: 5px;
    color: ${themeColor.main.chocomilk};
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
  font-size: 20px;
  border: 0;
  color: ${themeColor.main.chocomilk};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    background-color: ${themeColor.main.oatmeal};
    color: ${themeColor.main.white};
    font-weight: 800;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: ${themeColor.main.chocomilk};
  font-size: 25px;
`;
export default MonthSelect;
