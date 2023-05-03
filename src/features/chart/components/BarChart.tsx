import { useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { PropsData } from "../../../data/type/type";
import { themeColor } from "../../../utils/theme";
import { useMatchData } from "../hooks/useMatchData";
import * as St from "../styles/ChartStyle";

const BarChart = ({ graphData, month }: PropsData) => {
  const { countArr, newChartCount, matchedData, setCountArr } = useMatchData({
    graphData,
    month,
  });
  useEffect(() => {
    if (matchedData) {
      const numberArr = matchedData.graph.map((item) => item.count);
      setCountArr(numberArr);
    }
  }, [graphData, month]);

  return (
    <St.Wrapper>
      {newChartCount ? (
        <ApexCharts
          width="100%"
          height="100%"
          type="bar"
          series={[
            {
              name: "Avg",
              data: countArr,
            },
          ]}
          options={{
            legend: {
              show: false,
            },
            chart: {
              height: 600,
              fontFamily: "inherit",
              toolbar: { show: false },
              zoom: {
                enabled: false,
              },
              stacked: true,
            },
            colors: [
              themeColor.emoticon.sky,
              themeColor.emoticon.yellow,
              themeColor.emoticon.green,
              themeColor.emoticon.blue,
              themeColor.emoticon.pink,
              themeColor.emoticon.purple,
            ],
            plotOptions: {
              bar: {
                columnWidth: "70%",
                distributed: true,
              },
            },
            title: {
              text: "한 달 감정 평균 점수",
              align: "center",
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: themeColor.font,
              },
            },
            grid: {
              row: {
                colors: [themeColor.main.coffemilk, "transparent"],
                opacity: 0.2,
              },
            },
            xaxis: {
              categories: ["Fun", "Smile", "Calm", "Sad", "Angry", "Cry"],
              labels: {
                show: true,
                style: { colors: themeColor.font },
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      ) : (
        <St.ChartComment>
          <h2>감정 점수가 부족합니다😢</h2>
          <h2> 감정을 기록해주세요!</h2>
        </St.ChartComment>
      )}
    </St.Wrapper>
  );
};

export default BarChart;
