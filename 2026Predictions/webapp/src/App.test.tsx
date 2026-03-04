import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock IntersectionObserver for react-intersection-observer
beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

test('renders app successfully', () => {
  render(<App />);
  // Check that the layout renders correctly, for instance by checking the nav
  const titleElement = screen.getByText(/Scrollytelling Saga/i);
  expect(titleElement).toBeInTheDocument();
});
