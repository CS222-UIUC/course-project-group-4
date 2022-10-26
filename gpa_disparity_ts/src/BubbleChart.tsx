import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { GpaInformation, GpaInformationChart } from "./GpaInformation";
import { GpaColor } from "./GpaColor";

// This file modeled after: https://react-chartjs-2.js.org/examples/bubble-chart and
// inspired by Wade's GPA chart - https://waf.cs.illinois.edu/discovery/every_gen_ed_at_uiuc_by_gpa/

const min_point_radius = 5;
const max_point_radius = 20;

// https://stackoverflow.com/questions/8864430/compare-javascript-array-of-objects-to-get-min-max
const PrepareGpaInformationForChart = (
  gpas: GpaInformation[]
): GpaInformationChart[] => {
  const gpa_with_min_class_size = gpas.reduce((prev, curr) =>
    prev.class_size < curr.class_size ? prev : curr
  );
  const min_class_size = gpa_with_min_class_size.class_size;

  const gpa_with_max_class_size = gpas.reduce((prev, curr) =>
    prev.class_size > curr.class_size ? prev : curr
  );
  const max_class_size = gpa_with_max_class_size.class_size;

  return gpas.map((gpa): GpaInformationChart => {
    const scalable_part_of_radius = max_point_radius - min_point_radius;
    const scaled_class_size =
      (gpa.class_size - min_class_size) / (max_class_size - min_class_size);

    const class_size_radius = Math.round(
      min_point_radius + scaled_class_size * scalable_part_of_radius
    );

    const class_gpa_color = new GpaColor(gpa.average_gpa);
    return {
      ...gpa,
      class_size_radius: class_size_radius,
      gpa_color: class_gpa_color,
    };
  });
};

ChartJS.register(Title, LinearScale, PointElement, Tooltip /*, Legend,*/);

/* 4 things to fix:
-axis names for graph
-name of variables (y,x, r) changed to be (averageGpa, percent_four_point_zero)
-hover-over points list actual properties before values (Percent 4.0, GPA: 94, class size: 108)
-custom html legend for the chart - needed?
*/

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
          x: 95, // Percent 4.0 GPA: 94
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
