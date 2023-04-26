import styled from "styled-components";
import BarChart from "../features/chart/components/BarChart";
import PieChart from "../features/chart/components/PieChart";
import Flex from "../components/Flex";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import useChartData from "../features/chart/hooks/useChartData";
import useChartFn from "../features/chart/hooks/useChartFn";
import { scrollOnTop } from "../utils/scollOnTop";
import MonthSelect from "../features/diary/components/MonthSelect";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { device, themeColor } from "../utils/theme";
import { useState } from "react";
import * as St from "../features/chart/styles/ChartPageStyle";

const Chart = () => {
  scrollOnTop();

  const [isActive, setIsActive] = useState(false);
  const toggleChart = () => setIsActive((prev) => !prev);

  const { select, setSelect, month } = useChartFn();
  const { chartData } = useChartData(select.year);

  const emoIds: number[] = [1, 2, 3, 4, 5, 6];
  return (
    <St.Wrapper>
      <Flex jc="center" ai="center">
        <Flex>
          <></>
          <St.SelectWrap>
            <h1>
              {select.year}년 {select.month}월
            </h1>
            <MonthSelect select={select} setSelect={setSelect}>
              <St.SelectBtn>
                <MdOutlineArrowDropDownCircle />
              </St.SelectBtn>
            </MonthSelect>
          </St.SelectWrap>
        </Flex>
        <div>
          <h2>나의 감정은?</h2>
        </div>
        <St.ContentWrapper>
          <St.CheckBoxWrapper>
            <St.CheckBox onClick={toggleChart} id="checkbox" type="checkbox" />
            <St.CheckBoxLabel htmlFor="checkbox" />
          </St.CheckBoxWrapper>
          {isActive ? (
            <PieChart graphData={chartData} month={month} />
          ) : (
            <BarChart graphData={chartData} month={month} />
          )}
        </St.ContentWrapper>

        <Flex row gap={50}>
          <St.ChartWrap>
            <PieChart graphData={chartData} month={month} />
            <BarChart graphData={chartData} month={month} />
          </St.ChartWrap>
          <St.EmoList>
            {emoIds.map((item) => (
              <div key={item}>
                <EmotionIcons
                  height="50"
                  width="50"
                  emotionTypes={`EMOTION_${item}`}
                />
              </div>
            ))}
          </St.EmoList>
        </Flex>
      </Flex>
    </St.Wrapper>
  );
};

export default Chart;
