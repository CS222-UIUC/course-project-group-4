import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import CourseInfo from "./CourseInfo"

// how to change this to test 
// const RequestGPAInformationFromPythonAPI = (crn: number, subject: string) => {
//   const sample_class: CourseInfo = {
//     calendarYear: 2022,
//     term: "Fall",
//     subject: "CS",
//     courseID: 222,
//     title: "Software Design Lab",
//     creditHours: 1,
//     description: "Design and implementation of novel software solutions. Problem identification and definition idea generation and evaluation; and software implementation, testing, and deployment. Emphasizes software development best practices—including framework selection, code review, documentation, appropriate library usage, project management, continuous integration and testing, and teamwork. Prerequisite: CS 128; credit or concurrent registration in CS 225. Restricted to majors in Computer Science undergraduate curricula only."
//   };
//   return sample_class;
// };

test('renders subject label', () => {
  render(<App />);
  const linkElement = screen.getByText(/Subject:/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders subject content', () => {
  render(<App />);
  const linkElement = screen.getByText(/CS 222/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders term label', () => {
  render(<App />);
  const linkElement = screen.getByText(/Term:/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders term content', () => {
  render(<App />);
  const linkElement = screen.getByText(/Fall 2022/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders title label', () => {
  render(<App />);
  const linkElement = screen.getByText(/Title:/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders title content', () => {
  render(<App />);
  const linkElement = screen.getByText(/Software Design Lab/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders credit label', () => {
  render(<App />);
  const linkElement = screen.getByText(/Credit Hours:/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders credit content', () => {
  render(<App />);
  const linkElement = screen.getByText(/1/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders description label', () => {
  render(<App />);
  const linkElement = screen.getByText(/Description:/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders description content', () => {
  render(<App />);
  const linkElement = screen.getByText(/Design and implementation of novel software solutions. Problem identification and definition idea generation and evaluation; and software implementation, testing, and deployment. Emphasizes software development best practices—including framework selection, code review, documentation, appropriate library usage, project management, continuous integration and testing, and teamwork. Prerequisite: CS 128; credit or concurrent registration in CS 225. Restricted to majors in Computer Science undergraduate curricula only./i);
  expect(linkElement).toBeInTheDocument();
});
