import React from "react";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

interface PropsData {
  month?: number;
  graph?: Graph[];
  content: string | number;
  data: Data[];
}
interface Data {
  month: number;
  graph: Graph[];
}
interface Graph {
  id?: number;
  count?: number;
  percentage?: number;
}
const BarChart = ({ data, content }: any): JSX.Element => {
  const BarData = data?.data
    .filter((item: any) => item.month === Number(content))
    .map((item: any) => {
      return item?.graph.map((item: any) => {
        return item.count;
      });
    });
  return (
    <Wrapper>
      <ApexCharts
        width="600px"
        height="500px"
        type="bar"
        series={[
          {
            name: "count",
            data: BarData.flat(),
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
  margin-top: 100px;
  box-shadow: 10px 5px 5px #eee;
  border-radius: 25px;
`;
