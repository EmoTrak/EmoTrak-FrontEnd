import styled from "styled-components";
import { themeColor } from "../../../utils/theme";
import { BannerProps } from "../../../data/type/type";

export const Slider = styled.div`
  position: relative;
  width: 100vw;
`;

export const Banner = styled.div<BannerProps>`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  position: relative;
  background-color: ${({ index }) =>
    index === 0
      ? themeColor.landing.yellow
      : index === 1
      ? themeColor.landing.white
      : index === 2
      ? themeColor.landing.orange
      : null};
`;
export const BannerImg = styled.img`
  width: 100%;
  max-height: 100%;
  z-index: 0;
  transition: all 0.3s ease-in-out;
  transform: translateX(1000);
`;

export const NextBtn = styled.button`
  border: 0px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 30px;
  background-color: transparent;
  position: absolute;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const PrevBtn = styled.button`
  border: 0px;
  width: 40px;
  height: 40px;
  font-size: 30px;
  background-color: transparent;
  position: absolute;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
