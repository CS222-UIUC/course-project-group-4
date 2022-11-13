import ClassInfo from "../../interfaces/GpaInfo";
import * as lo from "lodash";

interface ClassList {
  classes: ClassInfo[];
}
export interface AggregateInfo {
  subject: string;
  class_number: string;
  average_gpa: number;
  average_class_size: number;
}

// calculates data for each specific course
export function processCalculations(props: ClassInfo[]) {
  var total_count = 0;
  var classes_count = props.length;
  var gpa_total = 0;

  props.forEach((element) => {
    // number of students count basically
    var add1 =
      Number(element.a_plus) +
      Number(element.a) +
      Number(element.a_minus) +
      Number(element.b_plus) +
      Number(element.b) +
      Number(element.b_minus) +
      Number(element.c_plus) +
      Number(element.c) +
      Number(element.c_minus) +
      Number(element.d_plus) +
      Number(element.d) +
      Number(element.d_minus) +
      Number(element.f);
    total_count = total_count + add1;

    // gpa calculation
    var add2 =
      4 * Number(element.a_plus) +
      4 * Number(element.a) +
      3.67 * Number(element.a_minus) +
      3.33 * Number(element.b_plus) +
      3 * Number(element.b) +
      2.67 * Number(element.b_minus) +
      2.33 * Number(element.c_plus) +
      2 * Number(element.c) +
      1.67 * Number(element.c_minus) +
      1.67 * Number(element.d_plus) +
      Number(element.d) +
      0.67 * Number(element.d_minus) +
      0 * Number(element.f);
    gpa_total = gpa_total + add2;
  });
  var avg_gpa = gpa_total / total_count;
  var avg_size = total_count / classes_count;
  const info: AggregateInfo = {
    subject: props[0].subject,
    class_number: props[0].number,
    average_gpa: avg_gpa,
    average_class_size: avg_size,
  };
  return info;
}

const AggregateGPA = (props: ClassInfo[]) => {
  const classes_info = lo.groupBy(props, "number");
  const classes_data: AggregateInfo[] = [];
  for (const number in classes_info) {
    classes_data.push(processCalculations(classes_info[number]));
  }
  // having issues looping thru array and printing out the information in a paragraph or smth
  return classes_data;
};

export default AggregateGPA;
