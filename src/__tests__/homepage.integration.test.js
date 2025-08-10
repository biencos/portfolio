import { screen, within } from '@testing-library/react';
import Home from '../views/Home';
import { renderWithRouter } from '../utils/testUtils';

// Test actual component integration without mocks
describe('Home Page Integration', () => {
  it('renders complete homepage with all components', () => {
    renderWithRouter(<Home />);

    // Navbar integration
    expect(
      screen.getByRole('img', { name: /portfolio logo/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();

    // Hero section integration
    expect(screen.getByText(/build something/i)).toBeInTheDocument();
    expect(screen.getByText(/great today/i)).toBeInTheDocument();
  });

  it('has proper anchor navigation setup', () => {
    const { container } = renderWithRouter(<Home />);

    // Verify anchors exist for navigation links
    expect(container.querySelector('#home')).toBeInTheDocument();
    expect(container.querySelector('#services')).toBeInTheDocument();
    expect(container.querySelector('#experience')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('renders services section with service cards', () => {
    renderWithRouter(<Home />);

    // Use more specific selector to avoid ambiguity
    const servicesHeading = screen.getByRole('heading', {
      name: /services/i,
      level: 2,
    });
    const servicesSection = servicesHeading.closest('.services-section');
    const serviceCards = within(servicesSection).getAllByRole('img');

    expect(serviceCards.length).toBeGreaterThan(0);
  });

  it('maintains responsive structure', () => {
    const { container } = renderWithRouter(<Home />);

    expect(container.querySelector('.home-container')).toBeInTheDocument();
    expect(container.querySelector('.home-hero')).toBeInTheDocument();
  });
});
