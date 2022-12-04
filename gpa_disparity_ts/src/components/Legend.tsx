import { Circle } from "@mui/icons-material";
import {
  min_point_radius,
  max_point_radius,
  ClassVals,
} from "./GpaChart/utility/GpaChartUtility";
import { LegendLine } from "./LegendLine";

interface LegendProps {
  extrema: ClassVals;
}

export const Legend = (props: LegendProps) => {
  const { extrema } = props;

  return (
    <div
      style={{
        border: "1px solid black",
        marginTop: "6rem",
        marginBottom: "6rem",
        flexGrow: 4,
        fontSize: 26,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <b>Legend</b>
      </div>
      <br />
      Circle size represents relative class size <br />
      <LegendLine
        circle_size={min_point_radius * 2.5}
        label={`min class size of ${extrema.min_size}`}
        color="red"
      />
      <LegendLine
        circle_size={max_point_radius * 2.5}
        label={`max class size of ${extrema.max_size}`}
        color="red"
      />
      <LegendLine
        circle_size={max_point_radius * 2.5}
        label={`4.0 GPA`}
        color="red"
      />
      <LegendLine
        circle_size={max_point_radius * 2.5}
        label={`3.0 GPA`}
        color="red"
      />
      <LegendLine
        circle_size={max_point_radius * 2.5}
        label={`2.0 GPA`}
        color="red"
      />
    </div>
  );
};
