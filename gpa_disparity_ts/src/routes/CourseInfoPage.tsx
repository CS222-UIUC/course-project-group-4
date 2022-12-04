import BackButton from "../components/BackButton";
import CourseInformation from "../components/CourseInformation";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchCourseInfo, fetchSubjects } from "../network/DataFetcher";
import DropDown from "../components/Dropdown";
import { useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// information for course info
// Assume Existing Function
// RequestGPAInformationFromPythonAPI(Year, CRN) -> Object containing Course information
// need to make it passable rather than set

function CourseInfoPage() {
  const { subj, num } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState<string | number>(subj!);
  const [courseNumber, setCourseNum] = useState<string | number>(num!);

  const initDropdown = (subject: String) => {
    return async () => ["120", "130", "140"];
  };

  return (
    // where_react_page_is_hosted/courseinfo/ECE/
    <div className="course-info-page" style={{ padding: "4rem" }}>
      {/* Holds our page component*/}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "2rem" }}>
          <BackButton
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div
          style={{
            marginRight: "4rem",
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <h3>Course Information</h3>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <DropDown
            retrieveMenuItems={fetchSubjects}
            value={subject}
            setValue={setSubject}
            label="Subject"
          />
          <DropDown
            retrieveMenuItems={initDropdown(`${subject}`)}
            value={courseNumber}
            setValue={setCourseNum}
            label="CourseNumber"
          />
          <div>
            <Button
              onClick={() => navigate(`/courseinfo/${subject}/${courseNumber}`)}
              variant="contained"
              color="primary"
              size="medium"
            >
              <SearchIcon />
            </Button>
          </div>
        </div>
      </div>
      <CourseInformation
        subject={String(subject)}
        course_number={Number(num)}
        requestCourseInfo={fetchCourseInfo}
      />
    </div>
  );
}

export default CourseInfoPage;
