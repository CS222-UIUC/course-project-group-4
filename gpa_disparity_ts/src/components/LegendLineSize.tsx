import { Circle } from "@mui/icons-material";

interface LegendLineProps {
  circle_size: number;
  label: string;
  color: string; //https://stackoverflow.com/questions/50867449/is-there-a-way-i-can-overwrite-the-colour-the-material-ui-icons-npm-package-prov
}

export const LegendLineSize = (props: LegendLineProps) => {
  const { label, circle_size, color } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "6rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "8rem",
        }}
      >
        <div
          style={{
            height: circle_size,
            width: circle_size,
            borderRadius: "999px",
            color: color,
            border: "1px black solid",
          }}
        />
      </div>
      <div style={{}}>{label}</div>
    </div>
  );
};
