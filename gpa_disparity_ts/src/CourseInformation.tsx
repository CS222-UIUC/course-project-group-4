import { useState } from "react";
import CourseInfo from "./CourseInfo";
interface CourseInfoDisplayProps {
  crn: number;
  subject: string;
  retrieveCourseInfo: (crn: number, subject: string) => CourseInfo;
}

const CourseInfoDisplay = (props: CourseInfoDisplayProps) => {
  const [course_info, setCourseInfo] = useState({} as CourseInfo);

  setCourseInfo(props.retrieveCourseInfo(props.crn, props.subject));

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

/* The below interface should be in its own file (GpaInformation.tsx) as
it will also be used by database / data management
Also good practice to keep data separate from code
It's only in this file for easier viewing as sample code.
*/
// export interface CourseInfo {
//     calendarYear: number
//     term: string
//     subject: string
//     courseID: number
//     title: string
//     creditHours: number
//     description: string
// }
