import styled from "styled-components";
interface PositionProps {
  position: number;
  url?: string;
}

export const TutorialWrapper = styled.div`
  margin: 0;
  width: 100%;
  border: 1px solid;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  min-height: 4000px;
`;

export const TutorialDiv = styled.div`
  position: relative;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
`;

export const TutorialBackgroundTop = styled.div<PositionProps>`
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
  background-position: ${({ position }) => `positionY(${position / 3})`}; ;
`;

export const TutorialBackgroundBottom = styled.div<PositionProps>`
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
  z-index: 3;
  background-position: ${({ position }) => `positionY(${position / 2})`};
  box-sizing: border-box;
  margin: 0;
`;

export const TutorialText = styled.img<PositionProps>`
  width: 100vw;
  position: relative;
  top: 0;
  height: 100%;
  transition: transform 0.05s ease-in-out;
  transform: ${({ position }) => `scale(${0.5 + position * 0.0003})`};
  z-index: 3;
`;

export const TutorialSun = styled.img<PositionProps>`
  width: 50vw;
  height: 100%;
  position: relative;
  top: 20vh;
  transition: transform 0.005s ease-in-out;
  transform: ${({ position }) =>
    position < 800 ? `translateY(${-position + 1000 / 1.3}px)` : `scale(1)`};
  z-index: 2;
`;

export const TutorialIcon1 = styled.img<PositionProps>`
  width: 18vw;
  height: 100%;
  position: relative;
  top: -5vh;
  transition: transform 0.1s ease-in-out;
  transform: ${({ position }) =>
    position < 550
      ? `scale(1)`
      : position < 700
      ? `translateY(${-position + 800 / 1.3}px)`
      : position < 800
      ? `translateY(${position - 1000 / 1.3}px)`
      : `scale(1)`};
  z-index: 4;
`;
export const TutorialIcon2 = styled.img<PositionProps>`
  width: 18vw;
  height: 100%;
  position: relative;
  top: -1vh;
  transition: transform 0.1s ease-in-out;
  transform: ${({ position }) =>
    position < 600
      ? `scale(1)`
      : position < 800
      ? `translateY(${-position + 800 / 1.3}px)`
      : position < 850
      ? `translateY(${position - 1050 / 1.3}px)`
      : `scale(1)`};
  z-index: 4;
`;
export const TutorialIcon3 = styled.img<PositionProps>`
  width: 18vw;
  height: 100%;
  position: relative;
  top: 1vh;
  transition: transform 0.1s ease-in-out;
  transform: ${({ position }) =>
    position < 700
      ? `scale(1)`
      : position < 850
      ? `translateY(${-position + 900 / 1.3}px)`
      : position < 900
      ? `translateY(${position - 1100 / 1.3}px)`
      : `scale(1)`};
  z-index: 4;
`;
export const TutorialIcon4 = styled.img<PositionProps>`
  width: 18vw;
  height: 100%;
  position: relative;
  top: -1vh;
  transition: transform 0.1s ease-in-out;
  transform: ${({ position }) =>
    position < 600
      ? `scale(1)`
      : position < 800
      ? `translateY(${-position + 800 / 1.3}px)`
      : position < 850
      ? `translateY(${position - 1050 / 1.3}px)`
      : `scale(1)`};
  z-index: 4;
`;
export const TutorialIcon5 = styled.img<PositionProps>`
  width: 18vw;
  height: 100%;
  position: relative;
  top: -5vh;
  transition: transform 0.1s ease-in-out;
  transform: ${({ position }) =>
    position < 550
      ? `scale(1)`
      : position < 700
      ? `translateY(${-position + 800 / 1.3}px)`
      : position < 800
      ? `translateY(${position - 1000 / 1.3}px)`
      : `scale(1)`};
  z-index: 4;
`;

export const PointBox = styled.div`
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
  background-color: #c78ec0;
  width: 10vw;
  height: 7vh;
  border-radius: 25px;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  color: white;
  font-family: "Pretendard-Regular";
  font-weight: 900;
  margin: 0 0 4vh 0;
`;

export const PointTitleP = styled.p`
  @font-face {
    font-family: "yg-jalnan";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  position: relative;
  font-size: 3vw;
  color: #896767;
  z-index: 6;
  font-family: "yg-jalnan";
  margin: 0 0 0 0;
`;

export const PointSubTitleP = styled.p`
  @font-face {
    font-family: "yg-jalnan";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  position: relative;
  font-size: 2vw;
  color: #dacdb3;
  z-index: 6;
  font-family: "yg-jalnan";
  margin: 0 0 2vh 0;
`;

export const PointP = styled.p`
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
  position: relative;
  font-size: 1.7vw;
  color: #ae9898;
  z-index: 6;
  font-family: "Pretendard-Regular";
  margin: 1vh 0 0 0;
  font-weight: 600;
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
  height: 130vh;
  z-index: 5;
`;

export const Calendar = styled.img<PositionProps>`
  width: 60vw;
  border: 10px solid #d9d9d9;
  border-radius: 3vh;
  margin: 5vh;
`;

export const Drawing = styled.img<PositionProps>`
  width: 60vw;
  border: 10px solid #d9d9d9;
  border-radius: 3vh;
  margin: 5vh;
`;

export const Graph = styled.img<PositionProps>`
  width: 60vw;
  border: 10px solid #d9d9d9;
  border-radius: 3vh;
  margin: 5vh;
`;

export const GraphTitle = styled.img<PositionProps>`
  width: 40vw;
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
  height: 130vh;
  z-index: 5;
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
  height: 130vh;
  z-index: 5;
`;
