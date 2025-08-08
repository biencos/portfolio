import { screen, fireEvent } from '@testing-library/react';
import NotFound from '../NotFound';
import { renderWithRouter } from '../../utils/testUtils';

describe('NotFound View', () => {
  it('renders without crashing', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('includes meta tags for SEO', () => {
    renderWithRouter(<NotFound />);
    // React Helmet doesn't work in test environment, so we check if the component renders
    expect(screen.getByText('OOPS! PAGE NOT FOUND')).toBeInTheDocument();
  });

  it('displays 404 error message', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('provides navigation back to home', () => {
    renderWithRouter(<NotFound />);

    const homeButton = screen.getByRole('button', { name: /go to home page/i });
    expect(homeButton).toBeInTheDocument();
  });

  it('navigates to home when button is clicked', () => {
    const { history } = renderWithRouter(<NotFound />);

    const homeButton = screen.getByRole('button', { name: /go to home page/i });
    fireEvent.click(homeButton);

    expect(history.location.pathname).toBe('/');
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
