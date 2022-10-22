import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import CourseInfo from "./CourseInfo"

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
