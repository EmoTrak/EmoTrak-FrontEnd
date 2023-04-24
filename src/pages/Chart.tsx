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
import { themeColor } from "../utils/theme";

const Chart = () => {
  scrollOnTop();
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

const SelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
  }
`;
const MonthModal = styled.div`
  position: relative;
`;
const SelectBtn = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 20px;
  color: #d0bd95;
  cursor: pointer;
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

const YearWrap = styled.div`
  display: flex;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e5dfd3;
  border-radius: 5px;
`;

const MonthList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${themeColor.main.white};
  border: 1px solid ${themeColor.main.paper};
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
      background-color: ${themeColor.main.paper};
      border-radius: 50%;
      width: 100%;
      height: 60%;
      margin: 0;
    }
  }
`;
