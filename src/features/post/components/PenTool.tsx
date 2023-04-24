import React from "react";
import styled from "styled-components";
import Flex from "../../../components/Flex";

interface PenProps {
  color: string;
  selectedSize: number;
  onSizeSelect(size: number): void;
  setSelectPen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PenTool = ({ color, selectedSize, onSizeSelect, setSelectPen }: PenProps) => {
  const sizeList: number[] = [20, 15, 10, 5];

  return (
    <>
      <Flex ai="center" jc="center">
        {sizeList.map((size) => (
          <StButtonBox
            key={size}
            size={size}
            color={color}
            onClick={() => {
              onSizeSelect(size);
              setSelectPen(false);
            }}
          >
            {" "}
          </StButtonBox>
        ))}
      </Flex>
    </>
  );
};

export default PenTool;

interface ButtonSize {
  size: number;
  color: string;
}

const StButtonBox = styled.div<ButtonSize>`
  height: ${({ size }) => `${size + 10}px`};
  width: ${({ size }) => `${size + 10}px`};
  margin: 5px;
  border: 1px solid transparent;
  background-color: ${({ color }) => `${color}`};
  border-radius: 50%;
`;
