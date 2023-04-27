import React from "react";
import Flex from "../../../components/Flex";
import { PenProps } from "../../../data/type/type";
import * as St from "../styles/PenToolStyle";

const PenTool = ({ color, onSizeSelect, setSelectPen }: PenProps) => {
  const sizeList: number[] = [20, 15, 10, 5];

  return (
    <>
      <Flex ai="center" jc="center">
        {sizeList.map((size) => (
          <St.ButtonBox
            key={size}
            size={size}
            color={color}
            onClick={() => {
              onSizeSelect(size);
              setSelectPen(false);
            }}
          ></St.ButtonBox>
        ))}
      </Flex>
    </>
  );
};

export default PenTool;
