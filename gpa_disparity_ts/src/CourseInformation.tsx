import { useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";
interface CourseInfoDisplayProps {
  subject: string;
  course_number: number;
  requestCourseInfo: (subject: string, course_number: number) => CourseInfo;
}

const CourseInfoDisplay = (props: CourseInfoDisplayProps) => {
  const [course_info, setCourseInfo] = useState({} as CourseInfo);

  useEffect(() => {
    setCourseInfo(props.requestCourseInfo(props.subject, props.course_number));
  }, [props.course_number, props.subject, props]);

  return (
    <div className="course-information-display">
      <p>
        <b> Subject: </b> {course_info.subject} {course_info.courseNumber}
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
