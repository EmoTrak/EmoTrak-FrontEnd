import BarChart from "../features/chart/components/BarChart";
import PieChart from "../features/chart/components/PieChart";
import Flex from "../components/Flex";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import useChartData from "../features/chart/hooks/useChartData";
import { scrollOnTop } from "../utils/scollOnTop";
import MonthSelect from "../features/diary/components/MonthSelect";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { useState } from "react";
import * as St from "../features/chart/styles/ChartPageStyle";
import { today } from "../utils/today";
import { DateType } from "../data/type/type";

const Chart = () => {
  scrollOnTop();
  const [select, setSelect] = useState<DateType>({
    year: today.year,
    month: today.month,
    date: today.date,
  });
  const [isActive, setIsActive] = useState(false);
  const toggleChart = () => setIsActive((prev) => !prev);

  const { chartData } = useChartData(select.year);

  const emoIds: number[] = [1, 2, 3, 4, 5, 6];
  return (
    <St.Container>
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

        <St.MobileWrapper>
          <St.CheckBoxWrapper>
            <St.CheckBox onClick={toggleChart} id="checkbox" type="checkbox" />
            <St.CheckBoxLabel htmlFor="checkbox" />
          </St.CheckBoxWrapper>
          {isActive ? (
            <PieChart graphData={chartData} month={select.month} />
          ) : (
            <BarChart graphData={chartData} month={select.month} />
          )}
        </St.MobileWrapper>

        <Flex row gap={50}>
          <St.ChartWrap>
            <PieChart graphData={chartData} month={select.month} />
            <BarChart graphData={chartData} month={select.month} />
          </St.ChartWrap>
          <St.EmoList>
            {emoIds.map((item) => (
              <EmotionIcons
                key={item}
                height="50px"
                width="50px"
                emotionTypes={`EMOTION_${item}`}
              />
            ))}
          </St.EmoList>
        </Flex>
      </Flex>
    </St.Container>
  );
};

export default Chart;
