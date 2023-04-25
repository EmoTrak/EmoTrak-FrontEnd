import React, { useState } from "react";
import Calender from "../../../assets/tutorial/5_Calender.webp";
import Canvas from "../../../assets/tutorial/5_Canvas.webp";
import Graph from "../../../assets/tutorial/5_Graph.webp";
import styled from "styled-components";
import LoginForm from "../../../features/login/components/LoginForm";
import { themeColor } from "../../../utils/theme";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Landing = () => {
  const [index, setIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);

  const images = [Calender, Canvas, Graph];

  const SWIPE_THRESHOLD = 50; // 터치 거리 기준값

  const nextContent = () => {
    const newIndex = index + 1;
    setIndex(newIndex);
  };

  const prevContent = () => {
    const newIndex = index - 1;
    setIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.changedTouches[0].clientX); // 변경된 포인트에서 X 좌표 가져오기
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX; // 변경된 포인트에서 X 좌표 가져오기
    const deltaX = touchEndX - touchStartX; // X 좌표의 차이 계산

    if (deltaX > SWIPE_THRESHOLD) {
      // 오른쪽으로 스와이프할 때
      if (index > 0) {
        prevContent();
      }
    } else if (deltaX < -SWIPE_THRESHOLD) {
      // 왼쪽으로 스와이프할 때
      if (index < 3) {
        nextContent();
      }
    }
  };

  console.log(index);

  return (
    <Slider onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {index < 3 ? (
        <Banner index={index}>
          <BannerImg src={images[index]} alt="landing image" />
          {index > 0 && index < 4 ? (
            <PrevBtn onClick={prevContent}>
              <IoIosArrowBack />
            </PrevBtn>
          ) : null}
          {index < 3 ? (
            <NextBtn onClick={nextContent}>
              <IoIosArrowForward />
            </NextBtn>
          ) : null}
        </Banner>
      ) : (
        <Banner index={index}> {index === 3 ? <LoginForm /> : null}</Banner>
      )}
    </Slider>
  );
};

export default Landing;

const Slider = styled.div`
  position: relative;
  width: 100vw;
`;

interface BannerProps {
  index: number;
}

const Banner = styled.div<BannerProps>`
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
const BannerImg = styled.img`
  width: 100%;
  max-height: 100%;
  z-index: 0;
  transition: all 0.3s ease-in-out;
  transform: translateX(1000);
`;

const NextBtn = styled.button`
  border: 0px;
  background-color: transparent;
  position: absolute;
  z-index: 3;
  cursor: pointer;
`;

const PrevBtn = styled.button`
  border: 0px;
  background-color: transparent;
  position: absolute;
  left: 0;
  z-index: 3;
  cursor: pointer;
`;
