import ApexCharts from "react-apexcharts";
import React from "react";
import styled from "styled-components";

function PieChart({ data, content }: any): JSX.Element {
  const PieData = data?.data
    .filter((item: any) => item.month === Number(content))
    .map((item: any) => {
      return item?.graph.map((item: any) => {
        return item.percentage;
      });
    });

  return (
    <Wrapper>
      <ApexCharts
        width="600px"
        height="500px"
        type="pie"
        series={PieData.flat()}
        options={{
          labels: ["Fun", "Smile", "Calm", "Sad", "Angry", "Cry"],
          colors: [
            "#8889C2",
            "#C78EC0",
            "#FEEC96",
            "#F89790",
            "#73C7EE",
            "#85C99E",
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
    </Wrapper>
  );
}

export default PieChart;

const Wrapper = styled.div`
  margin-top: 100px;
  box-shadow: 10px 5px 5px #eee;
  border-radius: 25px;
`;
