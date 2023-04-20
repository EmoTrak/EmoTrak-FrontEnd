import { useEffect } from "react";
import styled from "styled-components";
import BarChart from "../features/chart/components/BarChart";
import PieChart from "../features/chart/components/PieChart";
import Flex from "../components/Flex";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { getCookie } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import useChartData from "../features/chart/hooks/useChartData";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import useChartFn from "../features/chart/hooks/useChartFn";
import { scrollOnTop } from "../utils/scollOnTop";

const Chart = (): JSX.Element => {
  const nav = useNavigate();

  const {
    month,
    isShow,
    onMonthClick,
    prevMonth,
    nextMonth,
    ToggleHandler,
    year,
    options,
  } = useChartFn();
  const { chartData, isLoading, isError } = useChartData(year);

  useEffect(() => {
    if (!getCookie("token") && !getCookie("refreshToken")) {
      alert("로그인을 해주세요!");
      nav("/");
    } else {
      scrollOnTop();
    }
  }, [nav]);

  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>에러..</div>;

  const emoIds: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <StWrapper>
      <Flex jc="center" ai="center">
        <Flex>
          <SelectMonthWrap>
            <SliderBtn onClick={prevMonth}>
              <AiOutlineLeft />
            </SliderBtn>
            <SelectMonth onClick={ToggleHandler}>{month}월</SelectMonth>
            <SliderBtn onClick={nextMonth}>
              <AiOutlineRight />
            </SliderBtn>
          </SelectMonthWrap>
          {isShow && (
            <div style={{ position: "relative" }}>
              <BackGround onClick={ToggleHandler} />
              <MonthList>
                {options.map((item) => (
                  <MonthListBtn
                    key={item.value}
                    value={item.value}
                    onClick={onMonthClick}
                  >
                    <p>{item.month}</p>
                  </MonthListBtn>
                ))}
              </MonthList>
            </div>
          )}
        </Flex>
        <h1>{month}월 나의 감정은?</h1>
        <Flex row gap={50}>
          <PieChart graphData={chartData} month={month} />
          <BarChart graphData={chartData} month={month} />
          <StEmoList>
            {emoIds.map((item) => (
              <div key={item}>
                <EmotionIcons
                  height="50"
                  width="50"
                  emotionTypes={`EMOTION_${item}`}
                />
              </div>
            ))}
          </StEmoList>
        </Flex>
      </Flex>
    </StWrapper>
  );
};

export default Chart;

const SelectMonthWrap = styled.div`
  display: flex;
`;
const SliderBtn = styled.button`
  border: none;
  background-color: transparent;
  height: 5vh;
  cursor: pointer;
  &:hover {
    scale: 1.2;
  }
`;

const StWrapper = styled.div`
  margin-top: 50px;
  height: 100vh;
`;
const BackGround = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
const StEmoList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const SelectMonth = styled.div`
  width: 10vw;
  height: 5vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e5dfd3;
  border-radius: 5px;
`;

const MonthList = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 1vw;
  z-index: 5;
  width: 17vw;
  position: absolute;
  margin-top: 5px;
  left: -45px;
`;

const MonthListBtn = styled.button`
  border: 0;
  background-color: transparent;
  width: 4vw;
  height: 10vh;
  padding: 0.5vw;
  cursor: pointer;
  font-family: "KyoboHand";

  &:hover {
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eee;
      border-radius: 50%;
      width: 100%;
      height:60%;
      margin: 0;
    }
  }
`;
