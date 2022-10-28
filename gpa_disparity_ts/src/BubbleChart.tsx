import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { GpaInformation } from "./network/GpaInformation";
import { GpaColor } from "./GpaColor";
import { GpaInformationChart } from "./network/GpaInformation";

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

const processGpaInformation = (
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

  useEffect(() => {
    setGpaInformationList(props.retrieveGpasFromDb(props.subject));
  }, [props]);

  processGpaInformation(gpaInformationList);

  return (
    <div className="chart-wrapper">
      <Bubble options={options} data={mock_data} />
    </div>
  );
};

export default BubbleChart;
