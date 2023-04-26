import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { PropsData } from "../../../data/type/type";
import { device, themeColor } from "../../../utils/theme";

const BarChart = ({ graphData, month }: PropsData) => {
  const [barCountArr, setBarCountArr] = useState<number[]>([]);
  const newBarCount = barCountArr.reduce((sum: number, cur: number) => {
    return sum + cur;
  }, 0);

  useEffect(() => {
    const matchedData = graphData?.find((item) => item.month === Number(month));
    if (matchedData) {
      const test = matchedData.graph.map((item) => item.count);
      setBarCountArr(test);
    }
  }, [graphData, month]);

  return (
    <Wrapper>
      {newBarCount > 0 ? (
        <ApexCharts
          width="100%"
          height="100%"
          type="bar"
          series={[
            {
              name: "count",
              data: barCountArr,
            },
          ]}
          options={{
            chart: {
              height: 350,
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
              text: "EmoTrak 한달 감정 개수",
              align: "center",
            },

            grid: {
              row: {
                colors: [themeColor.main.gray, "transparent"],
                opacity: 0.5,
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
    </Wrapper>
  );
};

export default BarChart;

const Wrapper = styled.div`
  height: 55vh;
  width: 30vw;
  text-align: center;
  margin-top: 50px;
  background-color: ${themeColor.main.white};
  box-shadow: 10px 5px 5px ${themeColor.main.gray};
  border-radius: 25px;
  h2 {
    letter-spacing: 5px;
  }
  ${device.mobile} {
    height: 100vh;
    width: 70vw;
  }
`;
