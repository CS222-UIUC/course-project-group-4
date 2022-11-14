import CourseInfo from "../interfaces/CourseInfo";
import { GpaInformation } from "../interfaces/GpaInformation";

const retrieveSubjectsFromApi = async (): Promise<string[]> => [
  "CS",
  "ECE",
  "ME",
  "MEB",
];

const RequestGPAInformationFromPythonAPI = async (
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

const retrieveGpasFromApi = async (
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

export const mock_gpa_chart_data = {
  datasets: [
    {
      label: "CS 125",
      data: [
        //datapoints

        {
          //datapoint
          y: 95, // Percent 4.0
          x: 3.7, // Average GPA
          r: 20,
          percent: "Percent: ",
        },
      ],
      backgroundColor: "rgba(75, 161, 200, 0.8)",
    },
    {
      label: "CS 225",
      data: [
        {
          y: 80,
          x: 2.5,
          r: 15,
          percent: "Percent: ",
        },
      ],
      backgroundColor: "rgba(204, 99, 173, 0.8)",
    },
  ],
};
