import { screen } from '@testing-library/react';
import TermsOfUse from '../TermsOfUse';
import { renderWithRouter } from '../../utils/testUtils';

// Mock the useTranslations hook
jest.mock(
  '../../hooks/useTranslations',
  () => () => require('../../locales/en.json')
);

describe('TermsOfUse Component', () => {
  test('renders terms of use heading', () => {
    renderWithRouter(<TermsOfUse />);
    expect(
      screen.getByRole('heading', { level: 1, name: /terms of use/i })
    ).toBeInTheDocument();
  });

  test('renders effective date', () => {
    renderWithRouter(<TermsOfUse />);
    expect(
      screen.getByText(/effective date: august 20, 2025/i)
    ).toBeInTheDocument();
  });

  test('renders key sections', () => {
    renderWithRouter(<TermsOfUse />);
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
    renderWithRouter(<TermsOfUse />);
    expect(
      screen.getByText(/welcome to my portfolio website/i)
    ).toBeInTheDocument();
  });

  test('mentions contact form in user submissions', () => {
    renderWithRouter(<TermsOfUse />);
    expect(
      screen.getByText(
        /by submitting information through our website or communication channels/i
      )
    ).toBeInTheDocument();
  });
});
