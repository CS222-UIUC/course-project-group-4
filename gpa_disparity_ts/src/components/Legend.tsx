import {
  min_point_radius,
  max_point_radius,
  ClassVals,
} from "./GpaChart/utility/GpaChartUtility";
import { LegendLineGpa } from "./LegendLineGPA";
import { LegendLineSize } from "./LegendLineSize";

interface LegendProps {
  extrema: ClassVals;
}

export const Legend = (props: LegendProps) => {
  const { extrema } = props;

  return (
    <div
      style={{
        border: "1px",
        marginTop: "2rem",
        marginBottom: "2rem",
        flexGrow: 4,
        fontSize: 20,
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
      <LegendLineSize
        circle_size={min_point_radius * 2}
        label={`min class size of ${Math.round(extrema.min_size)}`}
        color="#5D98C4"
      />
      <LegendLineSize
        circle_size={max_point_radius * 2}
        label={`max class size of ${Math.round(extrema.max_size)}`}
        color="#CC63AD"
      />
      <LegendLineGpa
        circle_size={((max_point_radius + min_point_radius) / 2) * 2.5}
        label={`4.0 GPA`}
        color="#5D98C4"
      />
      <LegendLineGpa
        circle_size={((max_point_radius + min_point_radius) / 2) * 2.5}
        label={`3.0 GPA`}
        color="#957EB9"
      />
      <LegendLineGpa
        circle_size={((max_point_radius + min_point_radius) / 2) * 2.5}
        label={`2.0 GPA`}
        color="#CC63AD"
      />
    </div>
  );
};
