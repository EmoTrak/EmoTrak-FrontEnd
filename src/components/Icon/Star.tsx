import React from "react";
import { ReactComponent as StarIcon } from "../../assets/emoticon/star.svg";
import styled from "styled-components";

type Props = {
  size?: string;
  value?: number;
  color?: string;
  onClick(): void;
};

const Star = ({ size, onClick, value, color }: Props) => {
  return (
    <StStarButton type="button" value={value} onClick={onClick}>
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

// const RatingBox = styled.div`
//   margin: 0 auto;

//   & svg {
//     color: #e5dfd3;
//     cursor: pointer;
//   }
//   :hover svg {
//     color: #ffdc82;
//   }
//   & svg:hover ~ svg {
//     color: #e5dfd3;
//   }
//   /* .black {
//     color: black;
//   } */
// `;
