import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

// This file modeled after: https://react-chartjs-2.js.org/examples/bubble-chart and
// inspired by Wade's GPA chart - https://waf.cs.illinois.edu/discovery/every_gen_ed_at_uiuc_by_gpa/


const MODERATE_BLUE_GOOD_GRADE = { r: 75, g: 161, b: 200 };
const MODERATE_PINK_BAD_GRADE = { r: 204, g: 99, b: 173 };

ChartJS.register(Title, LinearScale, PointElement, Tooltip /*, Legend,*/);

export const options = {
  scales: {
    y: {
      //   beginAtZero: true,
    },
    x: {
      //   beginAtZero: true,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "GPA information",
    },
  },
};

export const mock_data = {
  datasets: [
    {
      label: "CS 125",
      data: [
        {
          x: 95,
          y: 3.7,
          r: 20,
        },
      ],
      backgroundColor: "rgba(75, 161, 200, 0.8)",
    },
    {
      label: "CS 225",
      data: [
        {
          x: 80,
          y: 2.5,
          r: 15,
        },
      ],
      backgroundColor: "rgba(204, 99, 173, 0.8)",
    },
  ],
};

// https://github.com/reactchartjs/react-chartjs-2/issues/155
const BubbleChart = (props: any) => (
  <div className="chart-wrapper">
    <Bubble options={options} data={mock_data} />
  </div>
);

export default BubbleChart;
