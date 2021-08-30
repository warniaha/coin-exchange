import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Paper Coin Exchange', () => {
  render(<App />);
  const linkElement = screen.getByText(/Paper Coin Exchange/i);
  expect(linkElement).toBeInTheDocument();
});
