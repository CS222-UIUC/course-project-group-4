import { Circle } from "@mui/icons-material";

interface LegendLineProps {
  circle_size: number;
  label: string;
  color: string; //https://stackoverflow.com/questions/50867449/is-there-a-way-i-can-overwrite-the-colour-the-material-ui-icons-npm-package-prov
}

export const LegendLine = (props: LegendLineProps) => {
  const { label, circle_size } = props;

  return (
    <div>
      <Circle
        style={{
          fontSize: circle_size,
          color: "red",
        }}
      />
      {label}
    </div>
  );
};
