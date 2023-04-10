import React from "react";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

function BarChart({ data }: any) {
  const colors = [
    "#8889C2",
    "#C78EC0",
    "#FEEC96",
    "#F89790",
    "#73C7EE",
    "#85C99E",
  ];
  return (
    <Wrapper>
      <ApexCharts
        width="600px"
        height="500px"
        type="bar"
        series={[
          {
            data: data?.data.slice(18, 24).map((item: { count: number }) => {
              return item.count;
            }),
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
          stroke: {
            curve: "straight",
          },
          colors: colors,
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
            categories: ["제목", "제목", "제목", "제목", "제목", "제목"],
          },
          yaxis: {
            show: false,
          },
        }}
      />
    </Wrapper>
  );
}

export default BarChart;

const Wrapper = styled.div`
  margin-top: 100px;
  box-shadow: 10px 5px 5px #eee;
  border-radius: 25px;
`;
