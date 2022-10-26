import { GpaColor } from "./GpaColor";

export interface GpaInformation {
  subject: string;
  course_number: number;
  course_title: string;
  average_gpa: number;
  class_size: number;
}

export interface GpaInformationChart extends GpaInformation {
  class_size_radius: number;
  gpa_color: GpaColor;
}
