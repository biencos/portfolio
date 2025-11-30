import { render, screen } from '@testing-library/react';
import ExperienceCard from '../ExperienceCard';
import { getLocale } from '../../utils/testUtils';

const locale = getLocale();

// Use first experience from locale if available, otherwise use mock
const mockExperience = locale.experience?.items?.[0] || {
  id: 1,
  position: 'Senior Software Engineer',
  company: 'Tech Solutions Inc.',
  duration: '2023 - Present',
  type: 'Full-time',
  description: 'Lead development of scalable web applications using AWS.',
};

describe('ExperienceCard', () => {
  it('renders experience card with all details', () => {
    render(<ExperienceCard experience={mockExperience} />);

    expect(screen.getByText(mockExperience.position)).toBeInTheDocument();
    expect(screen.getByText(mockExperience.company)).toBeInTheDocument();
    expect(screen.getByText(mockExperience.duration)).toBeInTheDocument();
    expect(screen.getByText(mockExperience.type)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockExperience.description.substring(0, 20)))
    ).toBeInTheDocument();
  });

  it('renders freelance type correctly', () => {
    const freelanceExperience = {
      ...mockExperience,
      type: 'Freelance',
    };

    render(<ExperienceCard experience={freelanceExperience} />);

    expect(screen.getByText('Freelance')).toBeInTheDocument();
  });

  it('applies correct CSS classes based on type', () => {
    const { container } = render(
      <ExperienceCard experience={mockExperience} />
    );

    const card = container.querySelector('.experience-card');
    const expectedClass =
      mockExperience.type === 'Full-time'
        ? 'experience-card--full-time'
        : 'experience-card--freelance';
    expect(card).toHaveClass(expectedClass);
    expect(card).toHaveAttribute('data-position', mockExperience.position);
  });
});
