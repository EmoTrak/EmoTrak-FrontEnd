import React from "react";
import ApexCharts from "react-apexcharts";

function BarChart() {
  return (
    <div>
      <ApexCharts
        width="760px"
        type="line"
        series={[
          {
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 100, 200, 150],
          },
        ]}
        options={{
          chart: {
            height: 350,
            type: "line",
            toolbar: { show: false },

            zoom: {
              enabled: false,
            },
            stacked: true,
          },
          colors: ["#00BAEC"],

          markers: {
            size: 5,
            colors: "#2b00ec",
          },
          stroke: {
            curve: "straight",
          },
          title: {
            // 제목입력하기
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          yaxis: {
            show: false,
          },
        }}
      />
    </div>
  );
}

export default BarChart;
