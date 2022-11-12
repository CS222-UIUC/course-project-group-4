import { useEffect, useState } from "react";
import ClassInfo from "./ClassInfo";
import * as lo from "lodash";
import { sample_classes } from "./sample_class_list";

interface ClassList {
  classes: ClassInfo[];
}

export interface AggregateInfo {
  subject: string;
  class_number: string;
  average_gpa: number;
  average_class_size: number;
}

const AggregateGPA = (props: ClassList) => {
  // var total_grades1 = Number(props.FallECE333366168573221121.a_plus_val) + Number(props.FallECE333366168573221121.a_val)
  // + Number(props.FallECE333366168573221121.a_minus_val) + Number(props.FallECE333366168573221121.b_plus_val) + Number(props.FallECE333366168573221121.b_val) +
  // Number(props.FallECE333366168573221121.b_minus_val) + Number(props.FallECE333366168573221121.c_plus_val) + Number(props.FallECE333366168573221121.c_val)
  // + Number(props.FallECE333366168573221121.c_minus_val) + ;
  const { classes } = props;
  const classes_info = lo.groupBy(classes, "number");

  return (
    <div className="aggregate-gpa-display">
      <p></p>
    </div>
  );
};

export default AggregateGPA;
