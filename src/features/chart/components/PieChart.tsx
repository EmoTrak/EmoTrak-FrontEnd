import ApexCharts from "react-apexcharts";
import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

function PieChart() {

  return (
    <Wrapper>
      <ApexCharts
        width="760px"
        height="500px"
        type="pie"
        series={[44, 55, 13, 43, 22, 50]}
        options={{
          labels: ["하이", "바이", "이거", "저거", "요거", "고거"],
          colors: [
            "#8889C2",
            "#C78EC0",
            "#FEEC96",
            "#F89790",
            "#73C7EE",
            "#85C99E",
          ],
          chart: {
            background: "transparent",
            toolbar: { show: false },
            zoom: { autoScaleYaxis: true },
          },
        }}
      />
    </Wrapper>
  );
}

export default PieChart;

const Wrapper = styled.div``;
