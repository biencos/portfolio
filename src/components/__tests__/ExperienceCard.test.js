import { render, screen } from '@testing-library/react';
import ExperienceCard from '../ExperienceCard';

const mockExperience = {
  id: 1,
  position: 'Senior Software Engineer',
  company: 'Tech Solutions Inc.',
  duration: '2023 - Present',
  type: 'full-time',
  description: 'Lead development of scalable web applications using AWS.',
};

describe('ExperienceCard', () => {
  it('renders experience card with all details', () => {
    render(<ExperienceCard experience={mockExperience} />);

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Solutions Inc.')).toBeInTheDocument();
    expect(screen.getByText('2023 - Present')).toBeInTheDocument();
    expect(screen.getByText('Full-time')).toBeInTheDocument();
    expect(
      screen.getByText(/Lead development of scalable web applications/)
    ).toBeInTheDocument();
  });

  it('renders freelance type correctly', () => {
    const freelanceExperience = {
      ...mockExperience,
      type: 'freelance',
    };

    render(<ExperienceCard experience={freelanceExperience} />);

    expect(screen.getByText('Freelance')).toBeInTheDocument();
  });

  it('applies correct CSS classes based on type', () => {
    const { container } = render(
      <ExperienceCard experience={mockExperience} />
    );

    const card = container.querySelector('.experience-card');
    expect(card).toHaveClass('experience-card--full-time');
    expect(card).toHaveAttribute('data-position', 'Senior Software Engineer');
  });
});
