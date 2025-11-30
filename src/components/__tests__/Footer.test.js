import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders footer logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('Portfolio logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo_light.svg');
  });

  test('renders navigation links', () => {
    render(<Footer />);

    expect(screen.getByLabelText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByLabelText('Terms of Use')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument();
  });

  test('renders correct link urls', () => {
    render(<Footer />);

    expect(screen.getByLabelText('Privacy Policy')).toHaveAttribute(
      'href',
      '/privacy-policy'
    );
    expect(screen.getByLabelText('Terms of Use')).toHaveAttribute(
      'href',
      '/terms-of-use'
    );
    expect(screen.getByLabelText('GitHub Profile')).toHaveAttribute(
      'href',
      'https://github.com/biencos'
    );
  });

  test('github link opens in new tab', () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText('GitHub Profile');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders copyright with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© Copyrighted by biencos, ${currentYear}`)
    ).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Footer />);

    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
  });

  test('displays logo correctly', () => {
    render(<Footer />);

    const logo = screen.getByAltText('Portfolio logo');
    expect(logo).toHaveAttribute('src', '/logo_light.svg');
  });
});
