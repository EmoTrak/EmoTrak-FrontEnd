import React from "react";
import { ReactComponent as StarIcon } from "../../assets/emoticon/star.svg";
import styled from "styled-components";
import { device } from "../../utils/theme";
import { StarProps } from "../../data/type/type";

const Star = ({ size, color, score, onClick }: StarProps) => {
  return (
    <StStarButton type="button" score={score} onClick={onClick}>
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

const StStarButton = styled.button<StarProps>`
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 50%;

  ${device.mobile} {
    width: 5vw;
  }
`;
