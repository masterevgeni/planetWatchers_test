import { render, screen } from '@testing-library/react';
import Buttons from './buttons';

test('check buttons', () => {
  render(<Buttons />);
  const replaceLink = screen.getByText(/Replace/i);
  const brightenLink = screen.getByText(/Brighten/i);
  expect(replaceLink).toBeInTheDocument();
  expect(brightenLink).toBeInTheDocument();
});
