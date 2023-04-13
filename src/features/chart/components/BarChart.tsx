import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { PropsData } from "../../../data/type/d2";

const BarChart = ({ graphData, month }: PropsData): JSX.Element => {
  const [barCountArr, setBarCountArr] = useState<number[]>([]);
  useEffect(() => {
    const matchedData = graphData.find((item) => item.month === Number(month));
    if (matchedData) {
      const test = matchedData.graph.map((item) => item.count);
      setBarCountArr(test);
    }
  }, [graphData, month]);

  return (
    <Wrapper>
      <ApexCharts
        width="600px"
        height="500px"
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
            "#73C7EE",
            "#FEEC96",
            "#85C99E",
            "#8889C2",
            "#F89790",
            "#C78EC0",
          ],
          plotOptions: {
            bar: {
              columnWidth: "50%",
              distributed: true,
            },
          },
          title: {
            text: "EmoTrak BarChart",
            align: "center",
          },

          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
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
    </Wrapper>
  );
};

export default BarChart;

const Wrapper = styled.div`
  margin-top: 50px;
  box-shadow: 10px 5px 5px #eee;
  border-radius: 25px;
`;
