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
import { NowDay } from "../features/diary/styles/CalendarStyle";
import { BackOfPage } from "../layouts/LayoutStyle";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Chart = () => {
  scrollOnTop();
  const navigate = useNavigate();
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
      <BackOfPage onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </BackOfPage>
      <Flex jc="center" ai="center">
        <NowDay>
          <span>
            {select.year}년 {select.month}월
          </span>
          <p />
          <MonthSelect select={select} setSelect={setSelect}>
            <St.SelectBtn>
              <MdOutlineArrowDropDownCircle />
            </St.SelectBtn>
          </MonthSelect>
        </NowDay>
        <div>나의 감정은?</div>

        <St.MobileWrapper>
          <St.CheckBoxWrapper>
            <St.ToggleBtn onClick={toggleChart} isActive={isActive}>
              <St.Circle isActive={isActive} />
            </St.ToggleBtn>
            <h3> {isActive ? "Pie" : "Bar"} Chart</h3>
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
