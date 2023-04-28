import styled from "styled-components";
import { themeColor } from "../../../utils/theme";
import { BannerProps } from "../../../data/type/type";

export const Slider = styled.div`
  position: relative;
  width: 100vw;
`;

export const Banner = styled.div<BannerProps>`
  width: 100vw;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  background-color: ${({ index }) =>
    index === 0
      ? themeColor.landing.yellow
      : index === 1
      ? themeColor.landing.white
      : index === 2 || 3
      ? themeColor.landing.orange
      : null};
`;
export const BannerImg = styled.img`
  position: absolute;
  top: 10vh;
  width: 240px;
  max-height: 500px;
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
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${themeColor.main.chocomilk};
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
  color: ${themeColor.main.chocomilk};
`;

export const LoginButton = styled.button`
  position: absolute;
  bottom: 9vh;
  border: none;
  height: 35px;
  width: 100px;
  border-radius: 10px;
  background-color: ${themeColor.main.chocomilk};
  color: white;
  font-family: inherit;
  font-size: 15px;

  &:hover {
    background-color: ${themeColor.main.coffemilk};
  }
`;
