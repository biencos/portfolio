import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThankYou from '../ThankYou';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const ThankYouWithRouter = () => (
  <MemoryRouter>
    <ThankYou />
  </MemoryRouter>
);

describe('ThankYou Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders thank you message', () => {
    render(<ThankYouWithRouter />);

    expect(screen.getByText('Thank You!')).toBeInTheDocument();
    expect(
      screen.getByText(/we will respond to your request within 24 hours/i)
    ).toBeInTheDocument();
  });

  test('renders go home button', () => {
    render(<ThankYouWithRouter />);

    const goHomeButton = screen.getByRole('button', {
      name: /return to home page/i,
    });
    expect(goHomeButton).toBeInTheDocument();
    expect(goHomeButton).toHaveTextContent('Go Home');
  });

  test('navigates to home when go home button is clicked', () => {
    render(<ThankYouWithRouter />);

    const goHomeButton = screen.getByRole('button', {
      name: /return to home page/i,
    });
    fireEvent.click(goHomeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('has proper styling classes', () => {
    const { container } = render(<ThankYouWithRouter />);

    expect(container.querySelector('.thank-you-page')).toBeInTheDocument();
    expect(container.querySelector('.thank-you-container')).toBeInTheDocument();
    expect(container.querySelector('.thank-you-content')).toBeInTheDocument();
  });
});
