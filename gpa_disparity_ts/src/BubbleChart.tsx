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

/* Data needed for component:
// - class subject & title: ECE 125
// - % of students that received 4.0 - X axis
// - Average GPA - used for color - Y axis and color
// - Number of students per year - used for size
*/

// Colors similar to Wade's (via colorpicker, alpha channel may varry)
// 	Moderate Blue (good): 75, 161, 200
//  Moderate Pink (bad): 204, 99, 173

// TODO
// -custom HTML legend - https://www.chartjs.org/docs/3.3.2/samples/legend/html.html
// -change bullet point text information to make more obvious what the data points mean (GPA, %3.0, class size)
// -probably want a function to determine either a linear or log scale for class size (reasonable outputs in range of 5 to 20),
//      will know better once we get aggregates from DB as to what reasonable scale factor will be

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
