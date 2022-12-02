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
import { GpaInformation } from "../../interfaces/GpaInformation";
import { Stack } from "@mui/system";
//import { StyleSheet } from 'react-native'

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
export interface ClassVals {
  min_size : number;
  max_size : number;
}

export function CalculateClassExtrema(gpas: GpaInformation[]){
  var gpa_with_min_class_size = gpas.reduce((prev, curr) =>
    prev.class_size < curr.class_size ? prev : curr
  );
  var min_class_size = gpa_with_min_class_size.class_size;

  var gpa_with_max_class_size = gpas.reduce((prev, curr) =>
    prev.class_size > curr.class_size ? prev : curr
  );
  var max_class_size = gpa_with_max_class_size.class_size;

  const size_data: ClassVals = {
    min_size : min_class_size,
    max_size : max_class_size,
  };
  return size_data;
};

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
  const [vals, setVals] = useState<ClassVals> ({min_size: 0, max_size: 0})
  useEffect(() => {
    retrieveGpasFromDb(subject).then((api_gpa_response: ApiClassInfo[]) => {
      const gpas = AggregateApiGpa(api_gpa_response);
      setVals(CalculateClassExtrema(gpas));
      const chart_data = FormatGpaForChart(gpas);
      setGpaInformationList(chart_data);
    });
  }, [subject, retrieveGpasFromDb]);
  options.onClick = ClickHandler;

  /*
  StyleSheet.create({
    circle:
      width: 20,
      height: 20,
      borderRadius: 20/2,
  });
  const circle = () => {
    return <View style={styles.circle} />;
  };
  */
  // <div
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",
  //         justifyContent: "flex-start",
  //         flexGrow: 4,
  //       }}></div>

  return (
    <div className="chart-wrapper">
      <div> 
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginRight: "4rem",
          // marginLeft : "4rem",
          marginBottom: "4rem",
          // marginTop: "4rem",
        }}> 

         <div style={{
          display: "flex",
          flexShrink: 2,
          justifyContent: "flex start",
          marginRight: "4rem",
        }}> </div>
      {gpaInformationList !== null ? (
        <Bubble options={options} data={gpaInformationList} />
      ) : (
        <div />
      )}

      <div style = {{border: '1px dashed black' }}>  
            Circle size represents relative class size <br />
            
            <br />
            min class size of {vals.min_size} <br />
            max class size of {vals.max_size} <br />
            4.0 GPA <br />
            3.0 GPA <br />
            2.0 GPA <br />
            1.0 GPA <br />
            <div style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "4rem",
          }}> </div>
      </div>
    
    </div>


      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div style={{ marginLeft: "8rem", marginRight: "8rem" }}>
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
        </div>
      </Modal>
    </div>
    
    </div>
  );
};

export default GpaChart;
