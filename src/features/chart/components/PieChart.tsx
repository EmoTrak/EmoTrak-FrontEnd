import ApexCharts from "react-apexcharts";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PropsData } from "../../../data/type/d2";

function PieChart({ graphData, month }: PropsData): JSX.Element {
  const [pieCountArr, setBarCountArr] = useState<number[]>([]);
  const newPieCount = pieCountArr.reduce((sum: number, cur: number) => {
    return sum + cur;
  }, 0);
  useEffect(() => {
    const matchedData = graphData.find((item) => item.month === Number(month));
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
              "#73C7EE",
              "#FEEC96",
              "#85C99E",
              "#8889C2",
              "#F89790",
              "#C78EC0",
            ],
            title: {
              text: "EmoTrak PieChart",
              align: "center",
              margin: 30,
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                fontFamily: undefined,
                color: "#263238",
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
  box-shadow: 10px 5px 5px #eee;
  border-radius: 25px;
  h2 {
    letter-spacing: 5px;
  }
`;
