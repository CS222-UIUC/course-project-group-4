import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import {
  FormatDataForChart as FormatGpaForChart,
  GpaChartData,
} from "./utility/GpaChartUtility";
import AggregateApiGpa from "./utility/GpaApiUtility";
import { ApiClassInfo } from "../../interfaces/API_ClassInfo";
import { options } from "./utility/GpaChartOptions";

// This file modeled after: https://react-chartjs-2.js.org/examples/bubble-chart and
// inspired by Wade's GPA chart - https://waf.cs.illinois.edu/discovery/every_gen_ed_at_uiuc_by_gpa/

//hover-over feature?
ChartJS.register(Title, LinearScale, PointElement, Tooltip /*, Legend,*/);

/* 4 things to fix:
-axis names for graph
-name of variables (r) changed to be (class_size)
-hover-over points list actual properties before values (Percent 4.0, GPA: 94, class size: 108)
-custom html legend for the chart - needed?
*/

export interface GpaChartProps {
  subject: string;
  retrieveGpasFromDb: (subject: string) => Promise<ApiClassInfo[]>;
}

// https://github.com/reactchartjs/react-chartjs-2/issues/155
const GpaChart = (props: GpaChartProps) => {
  const { subject, retrieveGpasFromDb } = props;

  const [gpaInformationList, setGpaInformationList] =
    useState<GpaChartData | null>(null);

  useEffect(() => {
    retrieveGpasFromDb(subject).then((api_gpa_response: ApiClassInfo[]) => {
      const gpas = AggregateApiGpa(api_gpa_response);
      const chart_data = FormatGpaForChart(gpas);
      setGpaInformationList(chart_data);
    });
  }, [subject, retrieveGpasFromDb]);

  return (
    <div className="chart-wrapper">
      {gpaInformationList !== null ? (
        <Bubble options={options} data={gpaInformationList} />
      ) : (
        <div />
      )}
    </div>
  );
};

export default GpaChart;
