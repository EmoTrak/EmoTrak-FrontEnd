import ApexCharts from "react-apexcharts";
import { useEffect } from "react";

import { PropsData } from "../../../data/type/type";

import { themeColor } from "../../../utils/theme";
import * as St from "../styles/ChartStyle";
import { useMatchData } from "../hooks/useMatchData";

function PieChart({ graphData, month }: PropsData) {
  const { countArr, newChartCount, matchedData, setCountArr } = useMatchData({
    graphData,
    month,
  });
  useEffect(() => {
    if (matchedData) {
      const percentArr = matchedData.graph.map((item) => item.percentage);
      setCountArr(percentArr);
    }
  }, [graphData, month]);

  return (
    <St.Wrapper>
      {newChartCount ? (
        <ApexCharts
          width="100%"
          height="100%"
          type="pie"
          series={countArr}
          options={{
            legend: {
              show: true,
              position: "bottom",
              labels: {
                colors: themeColor.font,
              },
            },
            labels: ["Fun", "Smile", "Calm", "Sad", "Angry", "Cry"],
            colors: [
              themeColor.emoticon.sky,
              themeColor.emoticon.yellow,
              themeColor.emoticon.green,
              themeColor.emoticon.blue,
              themeColor.emoticon.pink,
              themeColor.emoticon.purple,
            ],
            title: {
              text: "한 달 감정 평균",
              align: "center",
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: themeColor.font,
              },
            },
            chart: {
              fontFamily: "inherit",
              height: 600,
              background: "transparent,",
              toolbar: { show: false },
              zoom: { autoScaleYaxis: true },
            },
          }}
        />
      ) : (
        <h2>데이터가 없습니다!</h2>
      )}
    </St.Wrapper>
  );
}

export default PieChart;
