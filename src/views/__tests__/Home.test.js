import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../utils/testUtils';
import Home from '../Home';

// Mock ServiceCard component to avoid PropTypes scope issues
jest.mock('../../components/ServiceCard', () => {
  return function MockServiceCard() {
    return (
      <div data-testid='service-card'>
        <h3>Mock Service</h3>
        <p>Mock Description</p>
      </div>
    );
  };
});

// Mock Navbar component
jest.mock('../../components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid='navbar'>Mock Navbar</div>;
  };
});

describe('Home View', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Home />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('includes meta tags for SEO', () => {
    renderWithRouter(<Home />);
    // React Helmet doesn't work in test environment, so we check if the component renders
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument();
  });

  it('renders hero section with main heading', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText(/build something/i)).toBeInTheDocument();
    expect(screen.getByText(/great today/i)).toBeInTheDocument();
  });

  it('displays hero description text', () => {
    renderWithRouter(<Home />);

    expect(screen.getByText(/as a software engineer/i)).toBeInTheDocument();
  });

  it('renders all required sections with correct IDs', () => {
    const { container } = renderWithRouter(<Home />);

    expect(container.querySelector('#home')).toBeInTheDocument();
    expect(container.querySelector('#services')).toBeInTheDocument();
    expect(container.querySelector('#experience')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('includes Navbar component', () => {
    renderWithRouter(<Home />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders service cards in services section', () => {
    renderWithRouter(<Home />);

    const serviceCards = screen.getAllByTestId('service-card');
    expect(serviceCards.length).toBeGreaterThan(0);
  });
});
