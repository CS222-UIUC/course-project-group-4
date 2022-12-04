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
  ClassVals,
  CalculateClassExtrema,
  FormatDataForChart as FormatGpaForChart,
  GpaChartData,
} from "./utility/GpaChartUtility";
import AggregateApiGpa from "./utility/GpaApiUtility";
import { ApiClassInfo } from "../../interfaces/API_ClassInfo";
import { options } from "./utility/GpaChartOptions";
import { CourseInfoModal } from "./CourseInfoModal";

// This file modeled after: https://react-chartjs-2.js.org/examples/bubble-chart and
// inspired by Wade's GPA chart - https://waf.cs.illinois.edu/discovery/every_gen_ed_at_uiuc_by_gpa/

//hover-over feature?
ChartJS.register(Title, LinearScale, PointElement, Tooltip /*, Legend,*/);

// Modal Code based on:
// https://github.com/reactjs/react-modal

export interface GpaChartProps {
  subject: string;
  retrieveGpasFromDb: (subject: string) => Promise<ApiClassInfo[]>;
  setExtrema: React.Dispatch<React.SetStateAction<ClassVals>>;
}

// https://github.com/reactchartjs/react-chartjs-2/issues/155
const GpaChart = (props: GpaChartProps) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalSubject, setModalSubject] = useState<string>("");
  const [modalCourseNumber, setModalCourseNumber] = useState<string>("");

  const ClickHandler = (e: any) => {
    const points = e.chart.getElementsAtEventForMode(
      e,
      "nearest",
      { intersect: true },
      true
    );
    if (points.length) {
      const firstPoint = points[0];

      const data = e.chart.data.datasets[firstPoint.datasetIndex];

      let subject: string = data.label.split(" ")[0];
      let num: string = data.label.split(" ")[1];

      // navigate(`/`)
      //   navigate(`courseinfo/${subject}/${num}`);
      setModalSubject(subject);
      setModalCourseNumber(num);
      setModalIsOpen(true);
    }
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const { subject, retrieveGpasFromDb, setExtrema } = props;

  const [gpaInformationList, setGpaInformationList] =
    useState<GpaChartData | null>(null);

  useEffect(() => {
    retrieveGpasFromDb(subject).then((api_gpa_response: ApiClassInfo[]) => {
      const gpas = AggregateApiGpa(api_gpa_response);
      setExtrema(CalculateClassExtrema(gpas));
      const chart_data = FormatGpaForChart(gpas);
      setGpaInformationList(chart_data);
    });
  }, [subject, retrieveGpasFromDb, setExtrema]);
  options.onClick = ClickHandler;

  return (
    <div className="chart-wrapper">
      {gpaInformationList !== null ? (
        <div>
          <Bubble options={options} data={gpaInformationList} />
          <CourseInfoModal
            isOpen={modalIsOpen}
            subject={modalSubject}
            courseNumber={modalCourseNumber}
            closeModal={closeModal}
          />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default GpaChart;
