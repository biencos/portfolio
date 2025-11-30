import { render, screen } from '@testing-library/react';
import ServiceCard from '../ServiceCard';
import { getLocale } from '../../utils/testUtils';

const locale = getLocale();

// Test data factory - use locale values when available
const createTestProps = (overrides = {}) => {
  const defaultService = locale.services?.items?.[0] || {};
  return {
    icon: defaultService.icon || '/test-icon.svg',
    title: defaultService.title || defaultService.name || 'Test Service',
    description: defaultService.description || 'Test service description',
    alt: 'Test service icon',
    ...overrides,
  };
};

describe('ServiceCard Component', () => {
  it('renders without crashing', () => {
    const props = createTestProps();
    render(<ServiceCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
  });

  it('displays all required props correctly', () => {
    const firstService = locale.services?.items?.[0] || {};
    const props = createTestProps({
      title: firstService.title || firstService.name,
      description: firstService.description,
      alt: 'Test service icon',
    });

    render(<ServiceCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    // Use regex for descriptions with newlines
    expect(
      screen.getByText(new RegExp(props.description.substring(0, 40)))
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /test service icon/i })
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
