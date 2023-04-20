import { useEffect, useState } from "react";
import * as St from "../TutorialStyle";
import TutorialBackgroundTop from "../../../assets/tutorial/1_Tutorial_top.png";
import TutorialBackgroundBottom from "../../../assets/tutorial/1_Tutorial_bottom.png";
import TutorialText from "../../../assets/tutorial/2_Text_1.png";
import TutorialSun from "../../../assets/tutorial/2_Sun_1.png";
import TutorialIcon1 from "../../../assets/tutorial/2_Icon_1.png";
import TutorialIcon2 from "../../../assets/tutorial/2_Icon_2.png";
import TutorialIcon3 from "../../../assets/tutorial/2_Icon_3.png";
import TutorialIcon4 from "../../../assets/tutorial/2_Icon_4.png";
import TutorialIcon5 from "../../../assets/tutorial/2_Icon_5.png";
import TutorialCalender from "../../../assets/tutorial/4_Calender.png";
import TutorialDrawing from "../../../assets/tutorial/4_Drawing.png";
import TutorialGraph from "../../../assets/tutorial/4_Graph.png";
import { ReactComponent as TutorialGraphTitle } from "../../../assets/tutorial/4_GraphTitle.svg";

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
    <St.TutorialWrapper>
      <St.TutorialDiv>
        <St.TutorialBackgroundTop
          url={TutorialBackgroundTop}
          position={position}
        >
          <St.TutorialText src={TutorialText} position={position} />
          <St.TutorialSun src={TutorialSun} position={position} />
        </St.TutorialBackgroundTop>
        <St.TutorialBackgroundBottom
          url={TutorialBackgroundBottom}
          position={position}
        >
          <St.TutorialIcon1 src={TutorialIcon1} position={position} />
          <St.TutorialIcon2 src={TutorialIcon2} position={position} />
          <St.TutorialIcon3 src={TutorialIcon3} position={position} />
          <St.TutorialIcon4 src={TutorialIcon4} position={position} />
          <St.TutorialIcon5 src={TutorialIcon5} position={position} />
        </St.TutorialBackgroundBottom>
      </St.TutorialDiv>
      <St.TutorialDiv>
        <St.CalenderBackground position={position}>
          <St.PointBox>Point .1</St.PointBox>
          <St.PointTitleP>매일 기록하는 나만의 감정달력</St.PointTitleP>
          <St.PointP>
            날마다 다른 감정을 귀여운 6가지 이모티콘으로 채우는 재미! 다양한
            색과 표정으로 기록하세요!
          </St.PointP>
          <St.Calendar src={TutorialCalender} position={position} />
        </St.CalenderBackground>
      </St.TutorialDiv>
      <St.TutorialDiv>
        <St.DrawingBackground position={position}>
          <St.PointBox>Point .2</St.PointBox>
          <St.PointTitleP>내 마음대로 꾸미는 그림일기</St.PointTitleP>
          <St.PointSubTitleP>
            이모티콘과 감정별점으로 오늘의 기분에 점수를 매겨봐요!
          </St.PointSubTitleP>
          <St.PointP>
            자유롭게 그림판 위에 오늘을 기록하세요. 공유하기 기능으로 모두와
            함께 볼 수 있어요 !
          </St.PointP>
          <St.Drawing src={TutorialDrawing} position={position} />
        </St.DrawingBackground>
      </St.TutorialDiv>
      <St.TutorialDiv>
        <St.GraphBackground position={position}>
          <St.PointBox>Point .3</St.PointBox>
          <TutorialGraphTitle width="60vw" height="20vh" />
          <St.Graph src={TutorialGraph} position={position} />
        </St.GraphBackground>
      </St.TutorialDiv>
    </St.TutorialWrapper>
  );
};

export default Tutorial;
