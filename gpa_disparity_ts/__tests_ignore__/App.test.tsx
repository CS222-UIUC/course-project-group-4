import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

test("renders title text", () => {
  render(<App />);
  const title = screen.getByText(/gpa info/i);
  expect(title).toBeInTheDocument();
});
