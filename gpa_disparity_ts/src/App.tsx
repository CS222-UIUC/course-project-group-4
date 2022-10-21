import CourseInformation from "./CourseInformation";
import CourseInfo from "./CourseInfo";
import BubbleChart, { mock_data } from "./BubbleChart";
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import DropDown from "./dropdown";

function retrieveSubjectsFromDB() {
  return ["CS", "ECE", "ME", "MEB"];
}

// Assume Existing Function
// RequestGPAInformationFromPythonAPI(Year, CRN) -> Object containing Course information
// need to make it passable rather than set
const RequestGPAInformationFromPythonAPI = (crn: number, subject: string) => {
  const sample_class: CourseInfo = {
    calendarYear: 2022,
    term: "Fall",
    subject: "CS",
    courseID: 222,
    title: "Software Design Lab",
    creditHours: 1,
    description:
      "Design and implementation of novel software solutions. Problem identification and definition idea generation and evaluation; and software implementation, testing, and deployment. Emphasizes software development best practices—including framework selection, code review, documentation, appropriate library usage, project management, continuous integration and testing, and teamwork. Prerequisite: CS 128; credit or concurrent registration in CS 225. Restricted to majors in Computer Science undergraduate curricula only.",
  };
  return sample_class;
};

function App() {
  // Year & CRN are set by a dropdown component (implemented elsewhere)
  // Year & CRN are read by GpaInformationDisplay
  const [subject, setSubject] = useState<string | number>("CS");
  const [crn, setCRN] = useState(0);

  return (
    <div className="App">
      <BubbleChart />
      <DropDown
        retrieveMenuItems={retrieveSubjectsFromDB}
        value={subject}
        setValue={setSubject}
        label="Subject"
      />
      <CourseInformation
        subject={subject as string}
        crn={crn}
        requestCourseInfo={RequestGPAInformationFromPythonAPI}
      />
    </div>
  );
}
export default App;
