import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
    expect(
      screen.getByRole('img', { name: /portfolio logo/i })
    ).toBeInTheDocument();
  });

  it('displays all navigation links', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /experience/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('has correct href attributes for navigation links', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '#home'
    );
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute(
      'href',
      '#services'
    );
    expect(screen.getByRole('link', { name: /experience/i })).toHaveAttribute(
      'href',
      '#experience'
    );
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute(
      'href',
      '#contact'
    );
  });

  it('renders logo with correct attributes', () => {
    render(<Navbar />);

    const logo = screen.getByRole('img', { name: /portfolio logo/i });
    expect(logo).toHaveAttribute('src', '/logo_dark.svg');
    expect(logo).toHaveClass('navbar-logo');
  });
});
