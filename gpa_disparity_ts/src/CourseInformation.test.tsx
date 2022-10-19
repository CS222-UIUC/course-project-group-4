import React from "react";
import { render, screen } from "@testing-library/react";
import CourseInfo from "./CourseInfo";
import CourseInformation from "./CourseInformation";

// Assume Existing Function
// RequestGPAInformationFromPythonAPI(Year, CRN) -> Object containing Course information
// need to make it passable rather than set

const RequestGPAInformationFromPythonAPI = (crn: number, subject: string) => {
  const sample_class: CourseInfo = {
    calendarYear: 2022,
    term: "Fall",
    subject: "CS",
    courseID: 222,
    title: "Software Design Lab",
    creditHours: 1,
    description:
      "Design and implementation of novel software solutions. Problem identification and definition idea generation and evaluation; and software implementation, testing, and deployment. Emphasizes software development best practices—including framework selection, code review, documentation, appropriate library usage, project management, continuous integration and testing, and teamwork. Prerequisite: CS 128; credit or concurrent registration in CS 225. Restricted to majors in Computer Science undergraduate curricula only.",
  };
  return sample_class;
};

test("renders subject label", () => {
  const subject_dropdown_value = "";
  const crn = 0;

  render(
    <CourseInformation
      subject={subject_dropdown_value}
      crn={crn}
      requestCourseInfo={RequestGPAInformationFromPythonAPI}
    />
  );
  const subject = screen.getByText(/Subject:/i);
  expect(subject).toBeInTheDocument();
  const subject_value = screen.getByText(/CS 222/i);
  expect(subject_value).toBeInTheDocument();

  const term = screen.getByText(/Term:/i);
  expect(term).toBeInTheDocument();
  const term_value = screen.getByText(/Fall 2022/i);
  expect(term_value).toBeInTheDocument();

  const title = screen.getByText(/Title:/i);
  expect(title).toBeInTheDocument();
  const title_value = screen.getByText(/Software Design Lab/i);
  expect(title_value).toBeInTheDocument();

  const credit_hours = screen.getByText(/Credit Hours:/i);
  expect(credit_hours).toBeInTheDocument();
  const credit_hours_value = screen.getByText(/1/i);
  expect(credit_hours_value).toBeInTheDocument();

  const description = screen.getByText(/Description:/i);
  expect(description).toBeInTheDocument();
  const description_value = screen.getByText(
    /Design and implementation of novel software solutions. Problem identification and definition idea generation and evaluation; and software implementation, testing, and deployment. Emphasizes software development best practices—including framework selection, code review, documentation, appropriate library usage, project management, continuous integration and testing, and teamwork. Prerequisite: CS 128; credit or concurrent registration in CS 225. Restricted to majors in Computer Science undergraduate curricula only./i
  );
  expect(description_value).toBeInTheDocument();
});
