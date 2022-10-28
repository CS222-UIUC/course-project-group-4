import BackButton from "./BackButton";
import CourseInformation from "./CourseInformation";
import { useNavigate } from "react-router-dom";
import CourseInfo from "./CourseInfo";
import { useState } from "react";

// subjects and info set
const [subject] = useState<string | number>("CS");
const [course_number] = useState(0);
const navigate = useNavigate();

// information for course info
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


function CourseInfoPage() {
    return (
      <div className="course-info-page">
        {/* Holds our page component*/}
        <BackButton onClick={navigate(-1)}></BackButton>
      <CourseInformation
        subject={subject as string}
        course_number={course_number}
        requestCourseInfo={RequestGPAInformationFromPythonAPI}
      />
      </div>
    );
  };

  export default CourseInfoPage;