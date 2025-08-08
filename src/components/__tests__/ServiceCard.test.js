import { render, screen } from '@testing-library/react';
import ServiceCard from '../ServiceCard';

// Test data factory (DRY principle)
const createTestProps = (overrides = {}) => ({
  icon: '/test-icon.svg',
  title: 'Test Service',
  description: 'Test service description',
  alt: 'Test service icon',
  ...overrides,
});

describe('ServiceCard Component', () => {
  it('renders without crashing', () => {
    const props = createTestProps();
    render(<ServiceCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('displays all required props correctly', () => {
    const props = createTestProps({
      title: 'Web Development',
      description: 'Building modern web applications',
      alt: 'Web development icon',
    });

    render(<ServiceCard {...props} />);

    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(
      screen.getByText('Building modern web applications')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /web development icon/i })
    ).toBeInTheDocument();
  });

  it('renders icon with correct attributes', () => {
    const props = createTestProps({
      icon: '/custom-icon.png',
      alt: 'Custom service icon',
    });

    render(<ServiceCard {...props} />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', '/custom-icon.png');
    expect(icon).toHaveAttribute('alt', 'Custom service icon');
    expect(icon).toHaveClass('service-icon');
  });

  it('applies correct CSS classes', () => {
    const props = createTestProps();
    const { container } = render(<ServiceCard {...props} />);

    expect(container.firstChild).toHaveClass('service-card');
    expect(screen.getByRole('img').parentElement).toHaveClass(
      'service-icon-container'
    );
  });

  it('renders semantic HTML structure', () => {
    const props = createTestProps();
    render(<ServiceCard {...props} />);

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
