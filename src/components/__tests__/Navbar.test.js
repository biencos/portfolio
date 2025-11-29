import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import { getLocale } from '../../utils/testUtils';

const locale = getLocale();

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
    expect(
      screen.getByRole('img', { name: locale.navbar.logoAlt })
    ).toBeInTheDocument();
  });

  it('displays all navigation links', () => {
    render(<Navbar />);

    expect(
      screen.getByRole('link', { name: locale.navbar.links.home })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: locale.navbar.links.services })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: locale.navbar.links.experience })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: locale.navbar.links.contact })
    ).toBeInTheDocument();
  });

  it('has correct href attributes for navigation links', () => {
    render(<Navbar />);

    expect(
      screen.getByRole('link', { name: locale.navbar.links.home })
    ).toHaveAttribute('href', '#home');
    expect(
      screen.getByRole('link', { name: locale.navbar.links.services })
    ).toHaveAttribute('href', '#services');
    expect(
      screen.getByRole('link', { name: locale.navbar.links.experience })
    ).toHaveAttribute('href', '#experience');
    expect(
      screen.getByRole('link', { name: locale.navbar.links.contact })
    ).toHaveAttribute('href', '#contact');
  });

  it('renders logo with correct attributes', () => {
    render(<Navbar />);

    const logo = screen.getByRole('img', { name: locale.navbar.logoAlt });
    expect(logo).toHaveAttribute('src', '/logo_light.svg');
    expect(logo).toHaveClass('navbar-logo');
  });

  it('renders hamburger menu button', () => {
    render(<Navbar />);

    const hamburgerButton = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });
    expect(hamburgerButton).toBeInTheDocument();
    expect(hamburgerButton).toHaveClass('hamburger');
  });

  it('toggles menu when hamburger button is clicked', () => {
    render(<Navbar />);

    const hamburgerButton = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });
    const navLinks = document.querySelector('.navbar-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    // Initially closed
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    expect(navLinks).not.toHaveClass('open');
    expect(hamburgerIcon).not.toHaveClass('active');

    // Click to open
    fireEvent.click(hamburgerButton);
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
    expect(navLinks).toHaveClass('open');
    expect(hamburgerIcon).toHaveClass('active');

    // Click to close
    fireEvent.click(hamburgerButton);
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    expect(navLinks).not.toHaveClass('open');
    expect(hamburgerIcon).not.toHaveClass('active');
  });

  it('closes menu when navigation link is clicked', () => {
    render(<Navbar />);

    const hamburgerButton = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });
    const homeLink = screen.getByRole('link', { name: /home/i });
    const navLinks = document.querySelector('.navbar-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    // Open menu
    fireEvent.click(hamburgerButton);
    expect(navLinks).toHaveClass('open');
    expect(hamburgerIcon).toHaveClass('active');

    // Click nav link to close menu
    fireEvent.click(homeLink);
    expect(navLinks).not.toHaveClass('open');
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    expect(hamburgerIcon).not.toHaveClass('active');
  });
});
