import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { getLocale } from '../../utils/testUtils';

const locale = getLocale();

describe('Footer Component', () => {
  test('renders footer logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText(locale.footer.logoAlt);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo_light.svg');
  });

  test('renders navigation links', () => {
    render(<Footer />);

    expect(
      screen.getByLabelText(locale.footer.ariaLabels.privacyPolicy)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(locale.footer.ariaLabels.termsOfUse)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(locale.footer.ariaLabels.github)
    ).toBeInTheDocument();
  });

  test('renders correct link urls', () => {
    render(<Footer />);

    expect(
      screen.getByLabelText(locale.footer.ariaLabels.privacyPolicy)
    ).toHaveAttribute('href', '/privacy-policy');
    expect(
      screen.getByLabelText(locale.footer.ariaLabels.termsOfUse)
    ).toHaveAttribute('href', '/terms-of-use');
    expect(
      screen.getByLabelText(locale.footer.ariaLabels.github)
    ).toHaveAttribute('href', 'https://github.com/biencos');
  });

  test('github link opens in new tab', () => {
    render(<Footer />);

    const githubLink = screen.getByLabelText(locale.footer.ariaLabels.github);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders copyright with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const expectedCopyright = locale.footer.copyright.replace(
      '{year}',
      currentYear.toString()
    );
    expect(screen.getByText(expectedCopyright)).toBeInTheDocument();
  });

  test('has proper semantic structure', () => {
    render(<Footer />);

    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
  });

  test('displays logo correctly', () => {
    render(<Footer />);

    const logo = screen.getByAltText(locale.footer.logoAlt);
    expect(logo).toHaveAttribute('src', '/logo_light.svg');
  });
});
