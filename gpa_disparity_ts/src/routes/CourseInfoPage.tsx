import BackButton from "../components/BackButton";
import CourseInformation from "../components/CourseInformation";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { fetchCourseInfo, fetchGPAInfo } from "../network/DataFetcher";
import { PrepareGpaInformationForChart } from "../utility/BubbleChartUtility";

// information for course info
// Assume Existing Function
// RequestGPAInformationFromPythonAPI(Year, CRN) -> Object containing Course information
// need to make it passable rather than set

function CourseInfoPage() {
  // subjects and info set
  const { subj, num } = useParams();
  const subject = subj!;
  const navigate = useNavigate();

  return (
    // where_react_page_is_hosted/courseinfo/ECE/
    <div className="course-info-page">
      {/* Holds our page component*/}
      <BackButton
        onClick={() => {
          navigate(-1);
        }}
      />
      <CourseInformation
        subject={subject}
        course_number={Number(num)}
        requestCourseInfo={fetchCourseInfo}
      />
    </div>
    <div className="gpa-info-page">
      {/*holds gpa component */}
      <PrepareGpaInformationForChart
        gpa = {gpa}
        gpa_number = {Number(num)}
        requestGPAInfo = {fetchGPAInfo}
      />
    </div>
  );
}

export default CourseInfoPage;
