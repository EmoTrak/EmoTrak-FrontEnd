import ApexCharts from "react-apexcharts";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PropsData } from "../../../data/type/d2";
import { themeColor } from "../../../utils/theme";

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
    <Wrapper>
      {newPieCount > 0 ? (
        <ApexCharts
          width="600px"
          height="500px"
          type="pie"
          series={pieCountArr}
          options={{
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
    </Wrapper>
  );
}

export default PieChart;

const Wrapper = styled.div`
  height: 500px;
  width: 600px;
  text-align: center;
  margin-top: 50px;
  box-shadow: 10px 5px 5px ${themeColor.main.gray};
  border-radius: 25px;
  h2 {
    letter-spacing: 5px;
  }
`;
