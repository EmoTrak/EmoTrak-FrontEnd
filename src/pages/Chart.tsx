import React, { useEffect } from "react";
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

const Chart = (): JSX.Element => {
  const nav = useNavigate();

  const {
    month,
    firstIndex,
    isShow,
    ClickOption,
    onMonthClick,
    onPrevClick,
    onNextClick,
    ToggleHandler,
    year,
    options,
  } = useChartFn();
  const { chartData, isLoading, isError } = useChartData(year);

  useEffect(() => {
    if (!getCookie("token")) {
      alert("로그인을 해주세요!");
      nav("/");
    }
  }, [nav]);

  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>에러..</div>;

  const emoIds: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <StWrapper>
      <Flex jc="center" ai="center">
        <Flex row>
          <SliderBtn type="button" onClick={onPrevClick}>
            <AiOutlineLeft />
          </SliderBtn>
          <StMonth>
            {options.slice(firstIndex, firstIndex + 3).map((item) => (
              <button
                style={{ margin: "10px" }}
                key={item.value}
                value={item.value}
                type="button"
                onClick={() => ClickOption(item.value)}
              >
                {item.month}
              </button>
            ))}
          </StMonth>
          <SliderBtn type="button" onClick={onNextClick}>
            <AiOutlineRight />
          </SliderBtn>
        </Flex>
        <Flex>
          <SelectMonth onClick={ToggleHandler}>월선택</SelectMonth>
          {isShow && (
            <div>
              <BackGround onClick={ToggleHandler} />
              <MonthList>
                {options.map((item) => (
                  <MonthListBtn
                    key={item.value}
                    value={item.value}
                    onClick={onMonthClick}
                  >
                    {item.month}
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

const StMonth = styled.form`
  display: flex;
  text-align: center;
  margin-top: 10px;
  border-radius: 5px;
  max-width: 100vw;
  transition: 0.5s;
  button {
    background-color: #e5dfd3;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 10px;
    height: 5vh;
    width: 18vw;
    &:hover {
      background-color: #eee;
    }
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

const SliderBtn = styled.button`
  border: none;
  background-color: transparent;
  margin-top: 20px;
  height: 5vh;
  cursor: pointer;
  &:hover {
    scale: 1.2;
  }
`;
const SelectMonth = styled.div`
  width: 10vw;
  text-align: center;
  cursor: pointer;
  background-color: #e5dfd3;
  border-radius: 5px;
`;

const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid;
  border-radius: 1vw;
  z-index: 5;
  width: 10vw;
  position: absolute;
`;

const MonthListBtn = styled.button`
  border: 0;
  background-color: transparent;
  padding: 0.5vw;
  cursor: pointer;
  font-family: "KyoboHand";
  &:hover {
    border-radius: 1vw;

    background-color: #eee;
  }
`;
