import { GpaColor } from "./GpaColor";

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

test("bad grade colors", () => {
  const gpaColor = new GpaColor(1);
  expect(gpaColor.getRed()).toEqual(204);
  expect(gpaColor.getGreen()).toEqual(99);
  expect(gpaColor.getBlue()).toEqual(173);
});

test("A+ grade colors", () => {
  const gpaColor = new GpaColor(4.33);
  expect(gpaColor.getRed()).toEqual(75);
  expect(gpaColor.getGreen()).toEqual(161);
  expect(gpaColor.getBlue()).toEqual(200);
});
