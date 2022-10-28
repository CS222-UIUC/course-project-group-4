import CourseInformation from "./CourseInformation";
import CourseInfo from "./CourseInfo";
import BubbleChart from "./BubbleChart";
import React, { useState } from "react";
import "./App.css";
import DropDown from "./dropdown";
import { GpaInformation } from "./network/GpaInformation";
// import { Navigate } from "react-router-dom";
import "./App.css";
import BackButton from "./BackButton";

async function retrieveSubjectsFromDB() {
  return ["CS", "ECE", "ME", "MEB"];
}

// Assume Existing Function
// RequestGPAInformationFromPythonAPI(Year, CRN) -> Object containing Course information
// need to make it passable rather than set
const RequestGPAInformationFromPythonAPI = (
  subject: string,
  course_number: number
) => {
  const sample_class: CourseInfo = {
    calendarYear: 2022,
    term: "Fall",
    subject: "CS",
    courseNumber: 222,
    title: "Software Design Lab",
    creditHours: 1,
    description:
      "Design and implementation of novel software solutions. Problem identification and definition idea generation and evaluation; and software implementation, testing, and deployment. Emphasizes software development best practices—including framework selection, code review, documentation, appropriate library usage, project management, continuous integration and testing, and teamwork. Prerequisite: CS 128; credit or concurrent registration in CS 225. Restricted to majors in Computer Science undergraduate curricula only.",
  };
  return sample_class;
};

const retrieveGpasFromDb = (subject: string): GpaInformation[] => {
  const cs125: GpaInformation = {
    subject: "CS",
    course_number: 125,
    percent_four_point_zero: 95,
    class_size: 1000,
    average_gpa: 3.7,
  };
  const cs225: GpaInformation = {
    subject: "CS",
    course_number: 225,
    percent_four_point_zero: 80,
    class_size: 100,
    average_gpa: 2.5,
  };
  return [cs125, cs225];
};
const navigate = () => {};

function App() {
  // Year & CRN are set by a dropdown component (implemented elsewhere)
  // Year & CRN are read by GpaInformationDisplay
  const [subject, setSubject] = useState<string | number>("CS");
  const [course_number, setCourseNubmer] = useState(0);

  return (
    <div className="App">
      <BubbleChart
        subject={subject as string}
        retrieveGpasFromDb={retrieveGpasFromDb}
      />
      <BackButton onClick={navigate()}></BackButton>
      <DropDown
        retrieveMenuItems={retrieveSubjectsFromDB}
        value={subject}
        setValue={setSubject}
        label="Subject"
      />
      <CourseInformation
        subject={subject as string}
        course_number={course_number}
        requestCourseInfo={RequestGPAInformationFromPythonAPI}
      />
    </div>
  );
}

export default App;
