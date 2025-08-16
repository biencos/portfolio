import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import { renderWithRouter } from '../utils/testUtils';

// Test App routing behavior
const TestApp = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
);

describe('Navigation Integration', () => {
  it('renders home page by default', async () => {
    renderWithRouter(<TestApp />);

    await waitFor(() => {
      expect(screen.getByText(/build something/i)).toBeInTheDocument();
    });
  });

  it('navigates to 404 page for invalid routes', async () => {
    renderWithRouter(<TestApp />, {
      initialEntries: ['/invalid-route'],
    });

    await waitFor(() => {
      expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });
  });

  it('can navigate back to home from 404 page', async () => {
    renderWithRouter(<TestApp />, {
      initialEntries: ['/invalid-route'],
    });

    await waitFor(() => {
      expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });

    const homeButton = screen.getByRole('button', { name: /go to home page/i });
    fireEvent.click(homeButton);

    await waitFor(() => {
      expect(screen.getByText(/build something/i)).toBeInTheDocument();
    });
  });
});
