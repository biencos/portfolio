import { render, screen } from '@testing-library/react';
import TermsOfUse from '../TermsOfUse';

describe('TermsOfUse Component', () => {
  test('renders terms of use heading', () => {
    render(<TermsOfUse />);
    expect(
      screen.getByRole('heading', { level: 1, name: /terms of use/i })
    ).toBeInTheDocument();
  });

  test('renders effective date', () => {
    render(<TermsOfUse />);
    expect(
      screen.getByText(/effective date: August 20, 2025/i)
    ).toBeInTheDocument();
  });

  test('renders key sections', () => {
    render(<TermsOfUse />);
    expect(
      screen.getByRole('heading', { name: /use of website/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /user submissions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /^intellectual property$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /limitation of liability/i })
    ).toBeInTheDocument();
  });

  test('includes welcome message', () => {
    render(<TermsOfUse />);
    expect(
      screen.getByText(/welcome to our portfolio website/i)
    ).toBeInTheDocument();
  });

  test('mentions contact form in user submissions', () => {
    render(<TermsOfUse />);
    expect(
      screen.getByText(
        /by submitting information through our website or communication channels/i
      )
    ).toBeInTheDocument();
  });
});
