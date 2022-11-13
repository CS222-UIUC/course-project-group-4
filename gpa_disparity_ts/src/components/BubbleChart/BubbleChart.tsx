import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { GpaInformation } from "../../interfaces/GpaInformation";
import {
  processGpaInformation,
  options,
  mock_bubble_chart_data,
} from "../../utility/BubbleChartUtility";

// This file modeled after: https://react-chartjs-2.js.org/examples/bubble-chart and
// inspired by Wade's GPA chart - https://waf.cs.illinois.edu/discovery/every_gen_ed_at_uiuc_by_gpa/

//hover-over feature?
ChartJS.register(Title, LinearScale, PointElement, Tooltip /*, Legend,*/);

/* 4 things to fix:
-axis names for graph
-name of variables (y,x, r) changed to be (averageGpa, percent_four_point_zero)
-hover-over points list actual properties before values (Percent 4.0, GPA: 94, class size: 108)
-custom html legend for the chart - needed?
*/

export interface BubbleChartProps {
  subject: string;
  retrieveGpasFromDb: (subject: string) => Promise<GpaInformation[]>;
}

// https://github.com/reactchartjs/react-chartjs-2/issues/155
const BubbleChart = (props: BubbleChartProps) => {
  const { subject, retrieveGpasFromDb } = props;

  const [gpaInformationList, setGpaInformationList] = useState<
    GpaInformation[]
  >([] as GpaInformation[]);

  useEffect(() => {
    retrieveGpasFromDb(subject).then((gpas: GpaInformation[]) => {
      setGpaInformationList(gpas);
    });
  }, [subject, retrieveGpasFromDb]);

  processGpaInformation(gpaInformationList);

  return (
    <div className="chart-wrapper">
      <Bubble options={options} data={mock_bubble_chart_data} />
    </div>
  );
};

export default BubbleChart;
