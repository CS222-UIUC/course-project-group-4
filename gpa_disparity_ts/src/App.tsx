import { useState } from "react";
import "./App.css";
import BubbleChart from "./BubbleChart";
import GpaInformationDisplay, { GpaInformation } from "./GpaInformationDisplay";

// Assume Existing Function
// RequestGPAInformationFromPythonAPI(Year, CRN) -> Object containing Course information
// mocked for this example
const RequestGPAInformationFromPythonAPI = (crn: number, year: number) => {
  const sample_class: GpaInformation = {
    subject: "CS",
    course_number: 125,
    course_title: "Intro to Computer Science",
    average_gpa: 3.5,
  };
  return sample_class;
};

function App() {
  // Year & CRN are set by a dropdown component (implemented elsewhere)
  // Year & CRN are read by GpaInformationDisplay
  const [year, setYear] = useState(2020);
  const [crn, setCRN] = useState(0);

  return (
    <div className="App">
      {/* <BubbleChart /> */}
      <GpaInformationDisplay
        year={year}
        crn={crn}
        request_gpa_info={RequestGPAInformationFromPythonAPI}
      />
    </div>
  );
}

export default App;
