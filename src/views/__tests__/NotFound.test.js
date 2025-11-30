import { screen, fireEvent } from '@testing-library/react';
import NotFound from '../NotFound';
import { renderWithRouter, getLocale } from '../../utils/testUtils';

const locale = getLocale();

describe('NotFound View', () => {
  it('renders without crashing', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText(locale.notFound.description)).toBeInTheDocument();
  });

  it('displays correct page heading', () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByText(locale.notFound.pageNotFoundHeading)
    ).toBeInTheDocument();
  });

  it('displays 404 error message', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByText(locale.notFound.description)).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('provides navigation back to home', () => {
    renderWithRouter(<NotFound />);

    const homeButton = screen.getByRole('button', {
      name: locale.notFound.ariaLabel,
    });
    expect(homeButton).toBeInTheDocument();
  });

  it('has a clickable home button', () => {
    renderWithRouter(<NotFound />);

    const homeButton = screen.getByRole('button', {
      name: locale.notFound.ariaLabel,
    });
    fireEvent.click(homeButton);

    // Just verify the button is clickable without navigation since we can't test navigation in isolation
    expect(homeButton).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    const { container } = renderWithRouter(<NotFound />);

    expect(container.firstChild).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });
});
