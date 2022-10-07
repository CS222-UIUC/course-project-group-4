import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// This file copied / modeled after: https://react-chartjs-2.js.org/examples/bubble-chart

// ChartJS plugins
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Each class should have it's own label corresponding to class subject & title (ex "CS 125)")
// I do like Wade's GPA chart (https://waf.cs.illinois.edu/discovery/every_gen_ed_at_uiuc_by_gpa/)

/* Data needed for component:
// - class subject & title: ECE 125
// - Average GPA - used for color
// - % of students that received 4.0
// - Number of students per year - used for size
*/

export const data = {
  datasets: [
    {
      label: "Red dataset",
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Blue dataset",
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// I like the way this function looks a bit more than what I had:
// https://github.com/reactchartjs/react-chartjs-2/issues/155
const BubbleChart = (props: any) => (
  <div className="chart-wrapper">
    <Bubble options={options} data={data} />
  </div>
);

export default BubbleChart;
