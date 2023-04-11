import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as StarIcon } from "../../../assets/star.svg";
import { ReactComponent as BrandIcon } from "../../../assets/EmoTrakLogo.svg";

interface PositionProps {
  position: number;
}

const Tutorial = () => {
  const [position, setPosition] = useState<number>(0);
  const scroll = () => {
    setPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <StTutorialWrapper>
      <StTutorialDiv>
        {/* <StTutorialTitleContentDiv position={position}>
          <StTitle>EmoTrak</StTitle>
        </StTutorialTitleContentDiv> */}
      </StTutorialDiv>
      <StTutorialDiv>
        <StTutorialMovingLogoContentDiv>
          <StIconImageLeft position={position}>
            <StarIcon width={400} height={400} fill="yellow" />
          </StIconImageLeft>
          <StIconImageMain>
            <StarIcon width={500} height={500} fill="yellow" />
          </StIconImageMain>
          <StIconImageRight position={position}>
            <StarIcon width={400} height={400} fill="yellow" />
          </StIconImageRight>
        </StTutorialMovingLogoContentDiv>
      </StTutorialDiv>
      <StTutorialDiv>
        <StTutorialLogoContentDiv position={position}>
          <BrandIcon width={400} height={400} />
        </StTutorialLogoContentDiv>
      </StTutorialDiv>
      <StTutorialDiv>
        <StTutorialCalenderContentDiv position={position}>
          <StTutorialP>매일 나의 감정을 기록해요</StTutorialP>
        </StTutorialCalenderContentDiv>
      </StTutorialDiv>
      <StTutorialDiv>
        <StTutorialContentDiv>
          <StTutorialP>사진도, 그림일기도 가능!</StTutorialP>
        </StTutorialContentDiv>
      </StTutorialDiv>
      <StTutorialDiv>
        <StTutorialContentDiv>
          <StTutorialP>5개 이상 모이면 통계로도 확인할 수 있어요</StTutorialP>
        </StTutorialContentDiv>
      </StTutorialDiv>
      <StTutorialDiv>
        <StTutorialContentDiv>
          <StTutorialP>자랑하고 싶은 건 공유게시판에 !</StTutorialP>
        </StTutorialContentDiv>
      </StTutorialDiv>
      <StTutorialItem src="" alt="" />
      <StTutorialItem src="" alt="" />
    </StTutorialWrapper>
  );
};

export default Tutorial;

const StTutorialWrapper = styled.div`
  margin: 0;
  width: 100%;
  border: 1px solid;
  overflow: hidden;
  min-height: 2900px;
`;

const StTutorialDiv = styled.div`
  position: relative;
  z-index: 2;
`;
const StTutorialTitleContentDiv = styled.div<PositionProps>`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
  /* position-y: ${({ position }) => `${position / 2}`};s */
`;

const StTutorialMovingLogoContentDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
`;

const StTutorialLogoContentDiv = styled.div<PositionProps>`
  width: 100%;
  margin: 0 auto;
  display: flex;
  max-height: 10vh;
  left: 5%;
  justify-content: center;
  align-items: center;
  transition: transform 0.1s ease-in-out;
  transform: ${({ position }) => `scale(${0 + position * 0.0013})`};
`;

const StTutorialContentDiv = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
`;

const StTutorialCalenderContentDiv = styled.div<PositionProps>`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
  background: none;
  background-repeat: no-repeat;
  background-position-y: ${({ position }) => `${position / 2}`};
`;

const StTitle = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding: 40px 120px;
  font-size: 50px;
`;

const StTutorialP = styled.p`
  position: relative;
  font-size: 50px;
  z-index: 2;
`;

const StTutorialItem = styled.img`
  position: absolute;
  top: 1600px;
  right: 0;
  opacity: 0.5;
  z-index: 1;
`;

const StIconImageLeft = styled.div<PositionProps>`
  position: absolute;
  left: 0;
  z-index: 3;
  transform: ${({ position }) => `translateX(${position / 1.3}px)`};
`;

const StIconImageRight = styled.div<PositionProps>`
  position: absolute;
  right: 0;
  z-index: 3;
  transform: ${({ position }) => `translateX(${-position / 1.3}px)`};
`;

const StIconImageMain = styled.div`
  /* margin: 50px; */
`;
