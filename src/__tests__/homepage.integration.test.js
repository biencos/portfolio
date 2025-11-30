import { screen, within } from '@testing-library/react';
import Home from '../views/Home';
import { renderWithRouter } from '../utils/testUtils';

// Test actual component integration without mocks
describe('Home Page Integration', () => {
  it('renders complete homepage with all components', () => {
    renderWithRouter(<Home />);

    // Navbar and Footer integration
    const logos = screen.getAllByRole('img', { name: 'Portfolio logo' });
    expect(logos).toHaveLength(2); // One in navbar, one in footer
    expect(logos[0]).toHaveClass('navbar-logo');
    expect(logos[1]).toHaveClass('footer-logo');

    // Hero image
    expect(
      screen.getByRole('img', { name: /phone mockup/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();

    // Hero section integration
    expect(screen.getByText(/build something/i)).toBeInTheDocument();
    expect(screen.getByText(/amazing today/i)).toBeInTheDocument();
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

  it('renders experience section with professional cards', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(
      screen.getByText(/My journey in software development/)
    ).toBeInTheDocument();

    // Check for experience items
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Solutions Inc.')).toBeInTheDocument();
    expect(screen.getByText('2023 - Present')).toBeInTheDocument();
  });

  it('maintains responsive structure', () => {
    const { container } = renderWithRouter(<Home />);

    expect(container.querySelector('.home-container')).toBeInTheDocument();
    expect(container.querySelector('.home-hero')).toBeInTheDocument();
  });
});
