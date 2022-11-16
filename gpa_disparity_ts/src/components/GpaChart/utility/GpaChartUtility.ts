import { TooltipItem } from "chart.js";
import { GpaColor } from "./GpaColor";
import {
  GpaInformation,
  GpaInformationChart,
} from "../../../interfaces/GpaInformation";
import { Link } from "react-router-dom";
const min_point_radius = 5;
const max_point_radius = 20;

const kLabelPercent = "Percent: ";

export interface Dataset {
  label: string;
  data: {
    y: number;
    x: number;
    r: number;
    percent: string;
  }[];
  backgroundColor: string;
}

export interface GpaChartData {
  datasets: Dataset[];
}

// https://stackoverflow.com/questions/8864430/compare-javascript-array-of-objects-to-get-min-max
export const CalculateClassRadiusColor = (
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

const BuildChartDataset = (gpa_info: GpaInformationChart[]) => {
  const data: Dataset[] = [] as Dataset[];
  for (const gpaInfo of gpa_info) {
    const dataset: Dataset = {
      label: gpaInfo.subject + " " + gpaInfo.course_number,
      data: [
        {
          y: gpaInfo.percent_four_point_zero,
          x: gpaInfo.average_gpa,
          r: gpaInfo.class_size_radius, // FIXME should call function to calculate
          percent: kLabelPercent,
        },
      ],
      backgroundColor: gpaInfo.gpa_color.toString(), // FIXME should call function to calculate
    };

    data.push(dataset);
  }
  return { datasets: data };
};

export const FormatDataForChart = (
  gpaInformationList: GpaInformation[]
): GpaChartData => {
  const gpa_information = CalculateClassRadiusColor(gpaInformationList);
  const chart_info = BuildChartDataset(gpa_information);
  return chart_info;
};
