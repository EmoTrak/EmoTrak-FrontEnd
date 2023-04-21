import React, { ComponentPropsWithoutRef } from "react";
import { ReactComponent as StarIcon } from "../../assets/emoticon/star.svg";
import styled from "styled-components";

type Props = {
  size?: string;
  color?: string;
} & ComponentPropsWithoutRef<"button">;

const Star = ({ size, color, onClick }: Props) => {
  return (
    <StStarButton type="button" onClick={onClick}>
      <StarIcon
        height={size}
        width={size}
        fill={`${color}`}
        stroke={`${color}`}
      />
    </StStarButton>
  );
};

export default Star;

const StStarButton = styled.button<Props>`
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 50%;

  svg {
    :hover {
      fill: #ffdc82;
      stroke: #ffdc82;
    }
  }
`;
