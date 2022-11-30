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
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import CourseInformation from "../CourseInformation";
import { fetchCourseInfo } from "../../network/DataFetcher";
import { Button } from "@mui/material";

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

// Modal Code based on:
// https://github.com/reactjs/react-modal

export interface GpaChartProps {
  subject: string;
  retrieveGpasFromDb: (subject: string) => Promise<ApiClassInfo[]>;
}

// https://github.com/reactchartjs/react-chartjs-2/issues/155
const GpaChart = (props: GpaChartProps) => {
  const navigate = useNavigate();

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
  options.onClick = ClickHandler;
  return (
    <div className="chart-wrapper">
      {gpaInformationList !== null ? (
        <Bubble options={options} data={gpaInformationList} />
      ) : (
        <div />
      )}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Button
          onClick={() => {
            closeModal();
          }}
          variant="contained"
          //   startIcon={<ArrowBackIcon />}
          color="primary"
          size="medium"
        >
          Back To GPA Graph
        </Button>
        <CourseInformation
          subject={String(modalSubject)}
          course_number={Number(modalCourseNumber)}
          requestCourseInfo={fetchCourseInfo}
        />
      </Modal>
    </div>
  );
};

export default GpaChart;
