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

const Chart = () => {
  scrollOnTop();

  const [isActive, setIsActive] = useState(false);
  const toggleChart = () => setIsActive((prev) => !prev);

  const { select, setSelect, month } = useChartFn();
  const { chartData } = useChartData(select.year);

  const emoIds: number[] = [1, 2, 3, 4, 5, 6];
  return (
    <StWrapper>
      <Flex jc="center" ai="center">
        <Flex>
          <></>
          <SelectWrap>
            <h1>
              {select.year}년 {select.month}월
            </h1>
            <MonthSelect select={select} setSelect={setSelect}>
              <SelectBtn>
                <MdOutlineArrowDropDownCircle />
              </SelectBtn>
            </MonthSelect>
          </SelectWrap>
        </Flex>
        <div>
          <h2>나의 감정은?</h2>
        </div>
        <Wrapper>
          <CheckBoxWrapper>
            <CheckBox onClick={toggleChart} id="checkbox" type="checkbox" />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>
          {isActive ? (
            <PieChart graphData={chartData} month={month} />
          ) : (
            <BarChart graphData={chartData} month={month} />
          )}
        </Wrapper>
        <Flex row gap={50}>
          <ChartWrap>
            <PieChart graphData={chartData} month={month} />
            <BarChart graphData={chartData} month={month} />
          </ChartWrap>
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

const SelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
`;
const ChartWrap = styled.div`
  display: flex;
  gap: 50;
  h1 {
    margin: 0;
  }
  ${device.mobile} {
    display: none;
  }
`;
const SelectBtn = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 20px;
  color: ${themeColor.main.coffemilk};
  cursor: pointer;
`;

const StWrapper = styled.div`
  margin-top: 50px;
  width: 100vw;
  height: 100vh;
`;
const StEmoList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  ${device.mobile} {
    display: none;
  }
  ${device.tablet} {
    display: none;
  }
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  margin-top: 10px;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: ${themeColor.main.gray};
  margin-top: 10px;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: ${themeColor.main.white};
    box-shadow: 1px 3px 3px 1px ${themeColor.main.black};
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: ${themeColor.palette.green};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100vw;
  ${device.mobile} {
    height: 60vh;
    width: 100%;
    overflow: hidden;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
