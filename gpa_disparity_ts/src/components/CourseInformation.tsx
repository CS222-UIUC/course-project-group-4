import { useEffect, useState } from "react";
import CourseInfo from "../interfaces/CourseInfo";
interface CourseInfoDisplayProps {
  subject: string;
  course_number: number;
  requestCourseInfo: (
    subject: string,
    course_number: number
  ) => Promise<CourseInfo>;
}

const CourseInfoDisplay = (props: CourseInfoDisplayProps) => {
  const { subject, course_number, requestCourseInfo } = props;
  const [course_info, setCourseInfo] = useState({} as CourseInfo);

  useEffect(() => {
    requestCourseInfo(subject, course_number).then((course_info_from_api) => {
      console.log(course_info_from_api);
      setCourseInfo(course_info_from_api);
    });
  }, [course_number, requestCourseInfo, subject]);

  console.log(course_info);

  if (course_info.subject === undefined) return <div />;

  return (
    <div className="course-information-display">
      <p style={{ paddingTop: "1rem" }}>
        <b>
          {course_info.subject} {course_info.number} {course_info.name}
        </b>
      </p>
      <p style={{ lineHeight: "1.5rem" }}>{course_info.description}</p>
      <p style={{ paddingTop: "1rem" }}>
        <b>Credit Hours: </b>
        {course_info.credit_hours}
      </p>

      {course_info.degree_attributes !== "" ? (
        <p style={{ paddingTop: "1rem" }}>
          <b>Degree Attributes: </b>
          {course_info.degree_attributes}
        </p>
      ) : (
        <div />
      )}

      <br />
    </div>
  );
};

export default CourseInfoDisplay;
