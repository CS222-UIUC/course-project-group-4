import { GpaColor } from "../components/GpaChart/utility/GpaColor";

export interface GpaInformation {
  subject: string;
  course_number: number;
  average_gpa: number;
  class_size: number;
  percent_four_point_zero: number;
}

export interface GpaInformationChart extends GpaInformation {
  class_size_radius: number;
  gpa_color: GpaColor;
}
