import ApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";

import { PropsData } from "../../../data/type/type";

import { themeColor } from "../../../utils/theme";
import * as St from "../styles/ChartStyle";

function PieChart({ graphData, month }: PropsData) {
  const [pieCountArr, setBarCountArr] = useState<number[]>([]);
  const newPieCount = pieCountArr.reduce((sum: number, cur: number) => {
    return sum + cur;
  }, 0);
  useEffect(() => {
    const matchedData = graphData?.find((item) => item.month === Number(month));
    if (matchedData) {
      const test = matchedData.graph.map((item) => item.percentage);
      setBarCountArr(test);
    }
  }, [graphData, month]);

  return (
    <St.Wrapper>
      {newPieCount > 0 ? (
        <ApexCharts
          width="100%"
          height="100%"
          type="pie"
          series={pieCountArr}
          options={{
            legend: {
              show: true,
              position: "bottom",
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
              text: "EmoTrak 한달 감정 평균",
              align: "center",
              margin: 30,
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: undefined,
                color: themeColor.main.black,
              },
            },
            chart: {
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
