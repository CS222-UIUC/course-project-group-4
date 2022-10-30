import CourseInfo from "../interfaces/CourseInfo";
import { GpaInformation } from "../interfaces/GpaInformation";

export const retrieveSubjectsFromApi = async (): Promise<string[]> => [
  "CS",
  "ECE",
  "ME",
  "MEB",
];

export const RequestGPAInformationFromPythonAPI = async (
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

export const retrieveGpasFromApi = async (
  subject: string
): Promise<GpaInformation[]> => {
  const cs125: GpaInformation = {
    subject: "CS",
    course_number: 125,
    percent_four_point_zero: 95,
    class_size: 1000,
    average_gpa: 3.7,
  };
  const cs225: GpaInformation = {
    subject: "CS",
    course_number: 225,
    percent_four_point_zero: 80,
    class_size: 100,
    average_gpa: 2.5,
  };
  return [cs125, cs225];
};

/* <DropDown
retrieveMenuItems={retrieveSubjectsFromApi}
value={subject}
setValue={setSubject}
label="Subject"
/>
<BubbleChart
subject={subject as string}
retrieveGpasFromDb={retrieveGpasFromApi}
/>

<BackButton onClick={navigate()}></BackButton>
<CourseInformation
subject={subject as string}
course_number={course_number}
requestCourseInfo={RequestGPAInformationFromPythonAPI}
/>
 */
