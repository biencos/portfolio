import { render, screen } from '@testing-library/react';
import ClientFlags from '../ClientFlags';
import { getLocale } from '../../utils/testUtils';

const locale = getLocale();

describe('ClientFlags Component', () => {
  test('renders heading text', () => {
    render(<ClientFlags />);
    expect(
      screen.getByText(locale.clientFlags.sectionTitle)
    ).toBeInTheDocument();
    expect(
      screen.getByText(locale.clientFlags.sectionSubtitle)
    ).toBeInTheDocument();
  });

  test('renders all country flags', () => {
    render(<ClientFlags />);

    const flagImages = screen.getAllByRole('img');
    expect(flagImages).toHaveLength(15); // 5 countries × 3 duplicates for infinite scroll

    // Check for specific countries using getAllBy instead of getBy since we have duplicates
    expect(screen.getAllByAltText('United States flag')).toHaveLength(3);
    expect(screen.getAllByAltText('United Kingdom flag')).toHaveLength(3);
    expect(screen.getAllByAltText('Poland flag')).toHaveLength(3);
    expect(screen.getAllByAltText('South Korea flag')).toHaveLength(3);
    expect(screen.getAllByAltText('Norway flag')).toHaveLength(3);
  });

  test('renders country names', () => {
    render(<ClientFlags />);

    expect(
      screen.getAllByText(locale.clientFlags.countryNames.unitedStates)
    ).toHaveLength(3);
    expect(
      screen.getAllByText(locale.clientFlags.countryNames.unitedKingdom)
    ).toHaveLength(3);
    expect(
      screen.getAllByText(locale.clientFlags.countryNames.poland)
    ).toHaveLength(3);
    expect(
      screen.getAllByText(locale.clientFlags.countryNames.southKorea)
    ).toHaveLength(3);
    expect(
      screen.getAllByText(locale.clientFlags.countryNames.norway)
    ).toHaveLength(3);
  });

  test('has scrolling animation structure', () => {
    render(<ClientFlags />);

    const scrollContainer = document.querySelector(
      '.client-flags-scroll-container'
    );
    const flagsRow = document.querySelector('.client-flags-row');

    expect(scrollContainer).toBeInTheDocument();
    expect(flagsRow).toBeInTheDocument();
    expect(flagsRow).toHaveClass('client-flags-row');
  });
});
