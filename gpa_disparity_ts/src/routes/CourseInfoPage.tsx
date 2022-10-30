import BackButton from "../components/BackButton";
import CourseInformation from "../components/CourseInformation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RequestGPAInformationFromPythonAPI } from "../utility/MockData";

// information for course info
// Assume Existing Function
// RequestGPAInformationFromPythonAPI(Year, CRN) -> Object containing Course information
// need to make it passable rather than set

function CourseInfoPage() {
  // subjects and info set
  const [subject] = useState<string | number>("CS");
  const [course_number] = useState(0);
  const navigate = useNavigate();

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
}

export default CourseInfoPage;
