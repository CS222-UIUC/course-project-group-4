import { useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";
interface CourseInfoDisplayProps {
  crn: number;
  subject: string;
  requestCourseInfo: (crn: number, subject: string) => CourseInfo;
}

const CourseInfoDisplay = (props: CourseInfoDisplayProps) => {
  const [course_info, setCourseInfo] = useState({} as CourseInfo);

  useEffect(() => {
    setCourseInfo(props.requestCourseInfo(props.crn, props.subject));
  }, [props.crn, props.subject, props]);

  console.log(course_info);

  return (
    <div className="course-information-display">
      <p>
        <b> Subject: </b> {course_info.subject} {course_info.courseID}
        <br />
        <b> Title: </b> {course_info.title}
        <br />
        <b> Credit Hours: </b> {course_info.creditHours}
        <br />
        <b> Term: </b> {course_info.term} {course_info.calendarYear}
        <br />
        <b> Description: </b> {course_info.description}
        <br />
      </p>
    </div>
  );
};

export default CourseInfoDisplay;
