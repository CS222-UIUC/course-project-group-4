import { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { GpaInformation } from "./network/GpaInformation";

// This file modeled after: https://react-chartjs-2.js.org/examples/bubble-chart and
// inspired by Wade's GPA chart - https://waf.cs.illinois.edu/discovery/every_gen_ed_at_uiuc_by_gpa/

const MODERATE_BLUE_GOOD_GRADE = { r: 75, g: 161, b: 200 };
const MODERATE_PINK_BAD_GRADE = { r: 204, g: 99, b: 173 };

const kLabelPercent = "Percent: ";

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
        text: "Percentage of 4.0 GPAs",
      },
      //title: 'Percentage of 4.0 GPAs'
      //   beginAtZero: true,
    },
    x: {
      title: {
        display: true,
        text: "GPA",
      },
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
      },
    },
  },
};

interface Dataset {
  label: string;
  data: {
    y: number;
    x: number;
    r: number;
    percent: string;
  }[];
  backgroundColor: string;
}

interface BubbleChartData {
  datasets: Dataset[];
}

const Added  = (
  gpaInformationList: GpaInformation[]
): BubbleChartData => {
  const data: Dataset[] = [] as Dataset[];
  for (const gpaInfo of gpaInformationList) {
    const dataset: Dataset = {
      label: gpaInfo.subject + " " + gpaInfo.course_number,
      data: [
        {
          y: gpaInfo.percent_four_point_zero,
          x: gpaInfo.average_gpa,
          r: 20, // FIXME should call function to calculate
          percent: kLabelPercent,
        },
      ],
      backgroundColor: "rgba(75, 161, 200, 0.8)", // FIXME should call function to calculate
    };

    data.push(dataset);
  }
  return { datasets: data };
};

const mock_data = {
  datasets: [
    {
      label: "CS 125",
      data: [
        //datapoints

        {
          //datapoint
          y: 95, // Percent 4.0
          x: 3.7, // Average GPA
          r: 20,
          percent: "Percent: ",
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
          percent: "Percent: ",
        },
      ],
      backgroundColor: "rgba(204, 99, 173, 0.8)",
    },
  ],
};

interface BubbleChartProps {
  subject: string;
  retrieveGpasFromDb: (subject: string) => GpaInformation[];
}

// https://github.com/reactchartjs/react-chartjs-2/issues/155
const BubbleChart = (props: BubbleChartProps) => {
  const [gpaInformationList, setGpaInformationList] = useState<
    GpaInformation[]
  >([] as GpaInformation[]);

  setGpaInformationList(props.retrieveGpasFromDb(props.subject));

  processGpaInformation(gpaInformationList);

  return (
    <div className="chart-wrapper">
      <Bubble options={options} data={mock_data} />
    </div>
  );
};

export default BubbleChart;
