import { screen } from '@testing-library/react';
import PrivacyPolicy from '../PrivacyPolicy';
import { renderWithRouter } from '../../utils/testUtils';

// Mock the useTranslations hook
jest.mock(
  '../../hooks/useTranslations',
  () => () => require('../../locales/en.json')
);

describe('PrivacyPolicy Component', () => {
  test('renders privacy policy heading', () => {
    renderWithRouter(<PrivacyPolicy />);
    expect(
      screen.getByRole('heading', { level: 1, name: /privacy policy/i })
    ).toBeInTheDocument();
  });

  test('renders effective date', () => {
    renderWithRouter(<PrivacyPolicy />);
    expect(
      screen.getByText(/effective date: august 20, 2025/i)
    ).toBeInTheDocument();
  });

  test('renders key sections', () => {
    renderWithRouter(<PrivacyPolicy />);
    expect(
      screen.getByRole('heading', { name: /^information we collect$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /how we use your information/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /data security/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /your rights/i })
    ).toBeInTheDocument();
  });

  test('includes GDPR compliance section', () => {
    renderWithRouter(<PrivacyPolicy />);
    expect(
      screen.getByText(/legal bases for processing \(eu gdpr\)/i)
    ).toBeInTheDocument();
  });

  test('mentions contact form data collection', () => {
    renderWithRouter(<PrivacyPolicy />);
    expect(
      screen.getByText(
        /when you contact us through our contact form or other communication methods/i
      )
    ).toBeInTheDocument();
  });
});
