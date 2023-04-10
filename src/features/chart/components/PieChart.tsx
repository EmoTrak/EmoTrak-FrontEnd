import ApexCharts from "react-apexcharts";
import React from "react";
import styled from "styled-components";

function PieChart({ data }: any): JSX.Element {

  return (
    <Wrapper>
      <ApexCharts
        width="600px"
        height="500px"
        type="pie"
        series={[
          {
            data: data?.data
              .slice(18, 24)
              .map((item: { percentage: number }) => {
                return Math.round(item.percentage);
              }),
          },
        ]}
        options={{
          labels: ["슬픔", "행복", "이거", "저거", "요거", "고거"],
          colors: [
            "#8889C2",
            "#C78EC0",
            "#FEEC96",
            "#F89790",
            "#73C7EE",
            "#85C99E",
          ],
          title: {
            // 제목입력하기
            text: "EmoTrak PieChart",
            align: "center",
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
