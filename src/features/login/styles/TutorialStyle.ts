import styled, { StyledComponent } from "styled-components";
import { PositionProps, UrlType } from "../../../data/type/type";

export const TutorialWrapper = styled.div`
  margin: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  min-height: 300vh;
`;

export const TutorialDiv = styled.div`
  position: relative;
  height: 100%;
  margin: 0;
`;

export const TutorialBackgroundTop = styled.div<PositionProps & UrlType>`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  background-clip: border-box;
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  z-index: 1;
  overflow: hidden;
`;

export const TutorialBackgroundBottom = styled.div<PositionProps & UrlType>`
  position: relative;
  display: flex;
  top: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100%;
  z-index: 4;
  box-sizing: border-box;
  margin: 0;
`;

export const TutorialText: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transition: "transform 0.05s ease-in-out",
    transform: `scale(${0.4 + props.position * 0.0003})`,
  },
}))`
  width: 100vw;
  position: relative;
  top: 20vh;
  height: 100%;
  transition: transform 0.05s ease-in-out;
  z-index: 3;
`;

export const TutorialSun: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transition: "transform 0.005s ease-in-out",
    transform:
      props.position < 800
        ? `translateY(${-props.position + 1000 / 1.3}px)`
        : `scale(1)`,
  },
}))`
  width: 35vw;
  height: 100%;
  position: relative;
  top: 20vh;
  z-index: 2;
`;

export const TutorialGraphTitle = styled.img`
  position: relative;
  width: 47vw;
  height: 10.5vh;
  z-index: 6;
  font-family: "yg-jalnan";
  margin: 0 0 0 0;
`;

export const TutorialIcon1: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transition: "transform 0.1s ease-in-out",
    transform:
      props.position < 550
        ? `scale(1)`
        : props.position < 700
        ? `translateY(${-props.position + 800 / 1.3}px)`
        : props.position < 800
        ? `translateY(${props.position - 1000 / 1.3}px)`
        : `scale(1)`,
  },
}))`
  width: 10vw;
  height: 100%;
  position: relative;
  top: 0vh;
  z-index: 6;
`;

export const TutorialIcon2: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transition: "transform 0.1s ease-in-out",
    transform:
      props.position < 600
        ? `scale(1)`
        : props.position < 800
        ? `translateY(${-props.position + 800 / 1.3}px)`
        : props.position < 850
        ? `translateY(${props.position - 1050 / 1.3}px)`
        : `scale(1)`,
  },
}))`
  width: 10vw;
  height: 100%;
  position: relative;
  top: 4vh;
  z-index: 4;
`;

export const TutorialIcon3: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transform:
      props.position < 700
        ? `scale(1)`
        : props.position < 850
        ? `translateY(${-props.position + 900 / 1.3}px)`
        : props.position < 900
        ? `translateY(${props.position - 1100 / 1.3}px)`
        : `scale(1)`,
  },
}))`
  width: 10vw;
  height: 100%;
  position: relative;
  top: 6vh;
  transition: transform 0.1s ease-in-out;
  z-index: 4;
`;

export const TutorialIcon4: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transform:
      props.position < 600
        ? `scale(1)`
        : props.position < 800
        ? `translateY(${-props.position + 800 / 1.3}px)`
        : props.position < 850
        ? `translateY(${props.position - 1050 / 1.3}px)`
        : `scale(1)`,
  },
}))`
  width: 10vw;
  height: 100%;
  position: relative;
  top: 4vh;
  transition: transform 0.1s ease-in-out;
  z-index: 4;
`;
export const TutorialIcon5: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transform:
      props.position < 550
        ? `scale(1)`
        : props.position < 700
        ? `translateY(${-props.position + 800 / 1.3}px)`
        : props.position < 800
        ? `translateY(${props.position - 1000 / 1.3}px)`
        : `scale(1)`,
  },
}))`
  width: 10vw;
  height: 100%;
  position: relative;
  top: 0vh;
  transition: transform 0.1s ease-in-out;
  z-index: 4;
`;

export const DiaryIcon = styled.img<PositionProps>`
  width: 10vw;
  height: 20vh;
  position: relative;
  top: 15vh;
  z-index: 4;
`;

export const CalendarIcon: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transform:
      props.position < 750
        ? `scale(1)`
        : props.position < 1000
        ? `translateY(${-props.position + 800 / 0.5}px)`
        : props.position < 1100
        ? `translateY(${props.position - 1000 / 0.8}px)`
        : `scale(1)`,
  },
}))`
  width: 10vw;
  height: 20vh;
  position: relative;
  top: 10vh;
  right: 10vw;
  transition: transform 0.1s ease-in-out;
  z-index: 0;
  margin: 0;
`;

export const GraphIcon: StyledComponent<
  "img",
  any,
  PositionProps
> = styled.img.attrs<PositionProps>((props) => ({
  style: {
    transform:
      props.position < 3300
        ? "scale(1)"
        : props.position < 3600
        ? `translateX(${-props.position + 3700 / 1.2}px)`
        : "scale(1)",
  },
}))`
  width: 6vw;
  height: 11vh;
  position: relative;
  top: 40vh;
  left: 21vw;
  transition: transform 0.1s ease-in-out;
  z-index: 0;
  margin: 0;
`;

export const PointBox = styled.div`
  background-color: #c78ec0;
  width: 8vw;
  height: 6vh;
  border-radius: 25px;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5vw;
  color: white;
  font-family: "Pretendard-Regular";
  font-weight: 900;
  margin: 0 0 4vh 0;
`;

export const PointTitleP = styled.p`
  position: relative;
  font-size: 2vw;
  color: #896767;
  z-index: 6;
  font-family: "yg-jalnan";
  margin: 0 0 0 0;
`;

export const PointSubTitleP = styled.p`
  position: relative;
  font-size: 1.7vw;
  color: #dacdb3;
  z-index: 6;
  font-family: "yg-jalnan";
  margin: 0 0 2vh 0;
`;

export const PointP = styled.p`
  position: relative;
  font-size: 1.1vw;
  color: #ae9898;
  z-index: 6;
  font-family: "Pretendard-Regular";
  margin: 1vh 0 0 0;
  font-weight: 600;
`;

export const Calendar = styled.img<PositionProps>`
  width: 40vw;
  border: 8px solid #d9d9d9;
  border-radius: 3vh;
  margin: 0;
  z-index: 2;
`;

export const Drawing = styled.img<PositionProps>`
  width: 40vw;
  border: 8px solid #d9d9d9;
  border-radius: 3vh;
  margin: 5vh;
`;

export const Graph = styled.img<PositionProps>`
  width: 40vw;
  border: 8px solid #d9d9d9;
  border-radius: 3vh;
  margin: 5vh;
  z-index: 2;
`;

export const GraphTitle = styled.img<PositionProps>`
  width: 40vw;
`;

export const CalenderBackground = styled.div<PositionProps>`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fbf3cc;
  background-size: 100%;
  width: 100vw;
  height: 110vh;
  z-index: 2;
`;

export const DrawingBackground = styled.div<PositionProps>`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  background-size: 100%;
  width: 100vw;
  height: 120vh;
  z-index: 7;
`;

export const GraphBackground = styled.div<PositionProps>`
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fde5a7;
  background-size: 100%;
  width: 100vw;
  height: 110vh;
  z-index: 8;
`;
