import BackButton from "../components/BackButton";
import CourseInformation from "../components/CourseInformation";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchCourseInfo } from "../network/DataFetcher";

// information for course info
// Assume Existing Function
// RequestGPAInformationFromPythonAPI(Year, CRN) -> Object containing Course information
// need to make it passable rather than set

function CourseInfoPage() {
  const { subj, num } = useParams();
  // subjects and info set
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
  );
}

export default CourseInfoPage;
