import React from "react";
import Flex from "../../../components/Flex";
import { PenProps } from "../../../data/type/type";
import * as St from "../styles/PenToolStyle";

const PenTool = ({ color, onSizeSelect }: PenProps) => {
  const sizeList: number[] = [18, 13, 8, 3];

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
            }}
          ></St.ButtonBox>
        ))}
      </Flex>
    </>
  );
};

export default PenTool;
