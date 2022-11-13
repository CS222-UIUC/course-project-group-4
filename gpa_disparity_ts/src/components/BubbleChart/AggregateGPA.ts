import lo from "lodash";
import { ClassInfo, GpaInfo } from "../../interfaces/API_ClassInfo";

export interface AggregateInfo {
  subject: string;
  class_number: string;
  average_gpa: number;
  average_class_size: number;
  percent_four_point_zero: number;
}

const get_num_students_in_class = (class_instance: GpaInfo) => {
  const num_students_in_class =
    Number(class_instance.a_plus) +
    Number(class_instance.a) +
    Number(class_instance.a_minus) +
    Number(class_instance.b_plus) +
    Number(class_instance.b) +
    Number(class_instance.b_minus) +
    Number(class_instance.c_plus) +
    Number(class_instance.c) +
    Number(class_instance.c_minus) +
    Number(class_instance.d_plus) +
    Number(class_instance.d) +
    Number(class_instance.d_minus) +
    Number(class_instance.f);
  return num_students_in_class;
};

const get_gpa_sum = (class_instance: GpaInfo) => {
  const gpa_sum =
    4 * Number(class_instance.a_plus) +
    4 * Number(class_instance.a) +
    3.67 * Number(class_instance.a_minus) +
    3.33 * Number(class_instance.b_plus) +
    3 * Number(class_instance.b) +
    2.67 * Number(class_instance.b_minus) +
    2.33 * Number(class_instance.c_plus) +
    2 * Number(class_instance.c) +
    1.67 * Number(class_instance.c_minus) +
    1.67 * Number(class_instance.d_plus) +
    1 * Number(class_instance.d) +
    0.67 * Number(class_instance.d_minus) +
    0 * Number(class_instance.f);
  return gpa_sum;
};

const get_four_point_zero_sum = (class_instance: GpaInfo) => {
  return Number(class_instance.a_plus) + Number(class_instance.a);
};

// calculates data for each specific course
export function processCalculations(props: ClassInfo[]) {
  var num_classes_in_list = props.length;
  var total_number_of_students = 0;
  var gpa_total = 0;
  var four_point_zero_total = 0;

  props.forEach((class_instance) => {
    // number of students
    var num_students_in_class_instance =
      get_num_students_in_class(class_instance);
    total_number_of_students += num_students_in_class_instance;

    // gpa sum
    var sum_gpa_class_instance = get_gpa_sum(class_instance);
    gpa_total += sum_gpa_class_instance;

    // sum of gpa 4.0
    var sum_gpa_four_point_zero = get_four_point_zero_sum(class_instance);
    four_point_zero_total += sum_gpa_four_point_zero;
  });
  var avg_gpa = gpa_total / total_number_of_students;
  var avg_size = total_number_of_students / num_classes_in_list;
  var percent_four_point_zero =
    four_point_zero_total / total_number_of_students;
  const info: AggregateInfo = {
    subject: props[0].subject,
    class_number: props[0].number,
    average_gpa: avg_gpa,
    average_class_size: avg_size,
    percent_four_point_zero: percent_four_point_zero,
  };
  return info;
}

const AggregateGPA = (props: ClassInfo[]): AggregateInfo[] => {
  const classes = lo.groupBy(props, "number");
  const classes_data: AggregateInfo[] = [];
  for (const course_number in classes) {
    classes_data.push(processCalculations(classes[course_number]));
  }
  return classes_data;
};

export default AggregateGPA;
