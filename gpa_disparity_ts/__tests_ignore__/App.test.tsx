import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
//find the right location for App
import App from "../src/App";
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
//https://testing-library.com/docs/example-react-router/


//testing what's expected for the three known routes
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

//testing back button navigation
test('back button navigation', async () => {
  const history = '/some/history'

  render(
    <MemoryRouter initialEntries={[history]}>
      <Root />
    </MemoryRouter>,
  )
  
  //check to see if CourseInfoPage rendered properly
  render(<App />, {wrapper: BrowserRouter})
  const user = userEvent

  //verify CourseInfoPage
  expect(screen.getByText(/course-information-display/i).toBeInDocument())
})

