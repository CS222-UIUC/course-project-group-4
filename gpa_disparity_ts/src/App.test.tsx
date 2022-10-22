import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import BackButton from "./BackButton"

// unsure how  to test the onClick funtionality, need to expand testing in future
test('renders button with correct label', () => {
  render(<App />);
  const iconButton = screen.getByRole('button', {name: /contained/i});
  expect(iconButton).toHaveClass('contained')
});


