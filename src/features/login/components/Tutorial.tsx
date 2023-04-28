import { useEffect, useState } from "react";
import * as St from "../styles/TutorialStyle";
import TutorialBackgroundTop from "../../../assets/tutorial/1_Tutorial_top.webp";
import TutorialBackgroundBottom from "../../../assets/tutorial/1_Tutorial_bottom.webp";
import TutorialText from "../../../assets/tutorial/2_Text_1.webp";
import TutorialSun from "../../../assets/tutorial/2_Sun_1.webp";
import TutorialIcon1 from "../../../assets/tutorial/2_Icon_1.webp";
import TutorialIcon2 from "../../../assets/tutorial/2_Icon_2.webp";
import TutorialIcon3 from "../../../assets/tutorial/2_Icon_3.webp";
import TutorialIcon4 from "../../../assets/tutorial/2_Icon_4.webp";
import TutorialIcon5 from "../../../assets/tutorial/2_Icon_5.webp";
import CalendarIcon from "../../../assets/tutorial/3_Icon_3.webp";
import DiaryIcon1 from "../../../assets/tutorial/3_Icon_1.webp";
import DiaryIcon2 from "../../../assets/tutorial/3_Icon_2.webp";
import DiaryIcon3 from "../../../assets/tutorial/3_Icon_3.webp";
import DiaryIcon4 from "../../../assets/tutorial/3_Icon_4.webp";
import DiaryIcon5 from "../../../assets/tutorial/3_Icon_5.webp";
import DiaryIcon6 from "../../../assets/tutorial/3_Icon_6.webp";
import GraphIcon from "../../../assets/tutorial/3_Icon_1_left.webp";
import TutorialCalender from "../../../assets/tutorial/4_Calender.webp";
import TutorialDrawing from "../../../assets/tutorial/4_Drawing.webp";
import TutorialGraph from "../../../assets/tutorial/4_Graph.webp";
import TutorialGraphTitle from "../../../assets/tutorial/4_GraphTitle.webp";

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
          <St.TutorialText src={TutorialText} position={position} alt="" />
          <St.TutorialSun src={TutorialSun} position={position} alt="" />
        </St.TutorialBackgroundTop>
        <St.TutorialBackgroundBottom
          url={TutorialBackgroundBottom}
          position={position}
        >
          <St.TutorialIcon1 src={TutorialIcon1} position={position} alt="" />
          <St.TutorialIcon2 src={TutorialIcon2} position={position} alt="" />
          <St.TutorialIcon3 src={TutorialIcon3} position={position} alt="" />
          <St.TutorialIcon4 src={TutorialIcon4} position={position} alt="" />
          <St.TutorialIcon5 src={TutorialIcon5} position={position} alt="" />
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
          <St.CalendarIcon src={CalendarIcon} position={position} alt="" />
          <St.Calendar src={TutorialCalender} position={position} alt="" />
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
          <St.Drawing src={TutorialDrawing} position={position} alt="" />
          <div>
            <St.DiaryIcon src={DiaryIcon1} position={position} alt="" />
            <St.DiaryIcon src={DiaryIcon2} position={position} alt="" />
            <St.DiaryIcon src={DiaryIcon3} position={position} alt="" />
            <St.DiaryIcon src={DiaryIcon4} position={position} alt="" />
            <St.DiaryIcon src={DiaryIcon5} position={position} alt="" />
            <St.DiaryIcon src={DiaryIcon6} position={position} alt="" />
          </div>
        </St.DrawingBackground>
      </St.TutorialDiv>
      <St.TutorialDiv>
        <St.GraphBackground position={position}>
          <St.PointBox>Point .3</St.PointBox>
          <St.TutorialGraphTitle
            src={TutorialGraphTitle}
            width="47vw"
            height="20vh"
          />
          <St.GraphIcon src={GraphIcon} position={position} alt="" />
          <St.Graph src={TutorialGraph} position={position} alt="" />
        </St.GraphBackground>
      </St.TutorialDiv>
    </St.TutorialWrapper>
  );
};

export default Tutorial;
