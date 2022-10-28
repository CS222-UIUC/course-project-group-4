import {render, screen} from '@testing-library/react'
import App from './App'

import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'

// React Router v5

test('Going back to root from course info', async () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <App />
    </Router>,
  )

  const user = userEvent.setup()
  // verify page content for expected, starting at page w/ course info
  expect(screen.getByText(/Fall/i)).toBeInTheDocument()

  await user.click(screen.getByText(/Back/i))

  // check that the content changed back to root
  expect(screen.getByText(/GPA Information/i)).toBeInTheDocument()
})

test('Landing on a bad page', () => {
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  render(
    <Router history={history}>
      <App />
    </Router>,
  )

  expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
})