import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
//where did App.tsx go?

test("renders title text", () => {
  render(<App />);
  const title = screen.getByText(/gpa info/i);
  expect(title).toBeInTheDocument();
});

//from testing library for react router
//was not able to get to this this week, will finish by next week
test('landing on a bad page', () => {
  const badRoute = '/some/bad/route'

  // use <MemoryRouter> when you want to manually control the history
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>,
  )

  // verify navigation to "no match" route
  expect(screen.getByText(/no match/i)).toBeInTheDocument()
})