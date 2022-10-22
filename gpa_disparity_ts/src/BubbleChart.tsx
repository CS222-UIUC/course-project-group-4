import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import Context from "@mui/base/TabsUnstyled/TabsContext";

// This file modeled after: https://react-chartjs-2.js.org/examples/bubble-chart and
// inspired by Wade's GPA chart - https://waf.cs.illinois.edu/discovery/every_gen_ed_at_uiuc_by_gpa/

const MODERATE_BLUE_GOOD_GRADE = { r: 75, g: 161, b: 200 };
const MODERATE_PINK_BAD_GRADE = { r: 204, g: 99, b: 173 };

//hover-over feature?
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
      title: {
        display: true,
        text: 'Percentage of 4.0 GPAs'
      }
      //title: 'Percentage of 4.0 GPAs'
      //   beginAtZero: true,
    },
    x: {
      title: {
        display: true,
        text: 'GPA'
      }
      //   beginAtZero: true,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "GPA Information",
    },
    tooltip: {
      callbacks: {
        //specific labels for hover-over here, yet to be implemented
        //context throwing error for some reason
      }
    }
  },
};

export const mock_data = {
  datasets: [
    {
      label: "CS 125",
      data: [
        {
          y: 95, // Percent 4.0 GPA: 94
          x: 3.7,
          r: 20,
          percent: "Percent: "
        },
      ],
      backgroundColor: "rgba(75, 161, 200, 0.8)",
    },
    {
      label: "CS 225",
      data: [
        {
          y: 80,
          x: 2.5,
          r: 15,
          percent: "Percent: "
        },
      ],
      backgroundColor: "rgba(204, 99, 173, 0.8)",
    },
  ],
};

interface BubbleChartProps {
  subject: {}
  //function_call_from_db as a callback
  //unsure
  retrieveFromDatabase: () => string[]
}

// https://github.com/reactchartjs/react-chartjs-2/issues/155
const BubbleChart = (props: BubbleChartProps) => (
  //useEffect in here
  <div className="chart-wrapper">
    <Bubble options={options} data={mock_data} />
  </div>
);

export default BubbleChart;
