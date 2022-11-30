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
      <p>
        <b>
          {course_info.subject} {course_info.number} {course_info.name}
        </b>
        <br />
        <br />
        {course_info.description}
        <br />
        <br />
        <b>Credit Hours: </b>
        {course_info.credit_hours}
        <br />
        <br />

        {course_info.degree_attributes !== "" ? (
          <div>
            <b>Degree Attributes: </b>
            {course_info.degree_attributes}
          </div>
        ) : (
          <div />
        )}

        <br />
      </p>
    </div>
  );
};

export default CourseInfoDisplay;
