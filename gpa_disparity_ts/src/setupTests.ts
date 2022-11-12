// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { processCalculations } from "./AggregateGPA"

const ECE110 = [
  {
    a: "25",
    subject: "ECE",
    b: "13",
    c: "7",
    d: "1",
    c_minus: "3",
    f: "10",
    b_plus: "10",
    percent_4: "36.029411764705884",
    section: null,
    w: "1",
    a_minus: "21",
    id: "2021FallECE110242521101313873110101",
    schedule_type: "LEC",
    a_plus: "24",
    b_minus: "13",
    term: "Fall",
    d_minus: "0",
    d_plus: "1",
    avg: "3.088676470588235",
    c_plus: "8",
    number: "110",
    year: "2021",
    primary_instructor: "Makela, Jonathan J",
    title: "Introduction to Electronics",
  },
  {
    a: "22",
    subject: "ECE",
    b: "10",
    c: "4",
    d: "1",
    c_minus: "6",
    f: "9",
    b_plus: "9",
    percent_4: "37.719298245614034",
    section: null,
    w: "2",
    a_minus: "12",
    id: "2021FallECE110212212910784631292",
    schedule_type: "LEC",
    a_plus: "21",
    b_minus: "7",
    term: "Fall",
    d_minus: "2",
    d_plus: "3",
    avg: "2.96219298245614",
    c_plus: "8",
    number: "110",
    year: "2021",
    primary_instructor: "Choi, Hyungsoo",
    title: "Introduction to Electronics",
  },
  {
    a: "30",
    subject: "ECE",
    b: "18",
    c: "13",
    d: "2",
    c_minus: "2",
    f: "8",
    b_plus: "19",
    percent_4: "34.64052287581699",
    section: null,
    w: "3",
    a_minus: "20",
    id: "2021FallECE11023302019189713212183",
    schedule_type: "LEC",
    a_plus: "23",
    b_minus: "9",
    term: "Fall",
    d_minus: "1",
    d_plus: "1",
    avg: "3.113398692810457",
    c_plus: "7",
    number: "110",
    year: "2021",
    primary_instructor: "Schuh, Jonathon K",
    title: "Introduction to Electronics",
  },
];

var subject = processCalculations(ECE110).subject;
var number = processCalculations(ECE110).class_number;
var avg_gpa = processCalculations(ECE110).average_gpa;
var class_size = processCalculations(ECE110).average_class_size;

expect(subject).toEqual("ECE");
expect(number).toEqual("110");
expect(avg_gpa).toEqual(3.0665012406947882);
expect(class_size).toEqual(134.33333333333334);

