import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Calender from "../../../assets/tutorial/5_Calender.webp";
import Canvas from "../../../assets/tutorial/5_Canvas.webp";
import Graph_1 from "../../../assets/tutorial/5_Graph_1.webp";
import Graph_2 from "../../../assets/tutorial/5_Graph_2.webp";
import * as St from "../styles/LandingStyle";
import Flex from "../../../components/Flex";
import Login from "../../../pages/Login";

const Landing = () => {
  const [index, setIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);

  const images = [Calender, Canvas, Graph_1, Graph_2];

  const SWIPE_THRESHOLD = 50; // 터치 거리 기준값

  const nextContent = () => {
    const newIndex = index + 1;
    setIndex(newIndex);
  };

  const prevContent = () => {
    const newIndex = index - 1;
    setIndex(newIndex);
  };

  const directLogin = () => {
    setIndex(4);
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
      if (index < 4) {
        nextContent();
      }
    }
  };

  return (
    <St.Slider onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {index < 4 ? (
        <St.Banner index={index}>
          {index > 0 && index < 5 && (
            <St.PrevBtn onClick={prevContent}>
              <IoIosArrowBack />
            </St.PrevBtn>
          )}
          <Flex jc="center" ai="center" gap={40}>
            <St.BannerImg src={images[index]} alt="landing image" />
            <St.LoginButton onClick={directLogin}>Skip</St.LoginButton>
          </Flex>
          <St.NextBtn onClick={nextContent}>
            <IoIosArrowForward />
          </St.NextBtn>
        </St.Banner>
      ) : (
        <St.Banner index={index}>{index === 4 && <Login />}</St.Banner>
      )}
    </St.Slider>
  );
};

export default Landing;
