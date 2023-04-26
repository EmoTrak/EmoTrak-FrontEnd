import { PropsWithChildren } from "react";
import * as UI from "../../../components/Modal";
import styled from "styled-components";
import { DateSelectType } from "../../../data/type/type";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { device, themeColor } from "../../../utils/theme";
import * as St from "../styles/MonthSelectStyle";

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
        <St.Content>
          <UI.ModalClose>
            <St.CloseBtn>
              <IoMdClose />
            </St.CloseBtn>
          </UI.ModalClose>
          <St.Year>
            <button
              onClick={() => setSelect({ ...select, year: select.year - 1 })}
            >
              <AiOutlineLeft />
            </button>

            {select.year}
            <button
              onClick={() => setSelect({ ...select, year: select.year + 1 })}
            >
              <AiOutlineRight />
            </button>
          </St.Year>
          <St.SelectMonth>
            {month.map((_, i) => (
              <UI.ModalClose key={i}>
                <St.ClickBtn
                  onClick={() => setSelect({ ...select, month: i + 1 })}
                >
                  {i + 1}
                </St.ClickBtn>
              </UI.ModalClose>
            ))}
          </St.SelectMonth>
        </St.Content>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};

export default MonthSelect;
