import { useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { PropsData } from "../../../data/type/type";
import { themeColor } from "../../../utils/theme";
import * as St from "../styles/ChartStyle";
import { useMatchData } from "../hooks/useMatchData";

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
              name: "count",
              data: countArr,
            },
          ]}
          options={{
            legend: {
              show: false,
            },
            chart: {
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
                columnWidth: "50%",
                distributed: true,
              },
            },
            title: {
              text: "한 달 감정 개수",
              align: "center",
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: themeColor.main.black,
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
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      ) : (
        <h2>데이터가 없습니다!</h2>
      )}
    </St.Wrapper>
  );
};

export default BarChart;
