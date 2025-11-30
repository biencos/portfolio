import PropTypes from 'prop-types';
import './ExperienceCard.css';

const ExperienceCard = ({ experience }) => {
  // Convert employment type to CSS class name (e.g., "Freelance" → "freelance")
  const getTypeClassName = type => {
    return type.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div
      className={`experience-card experience-card--${getTypeClassName(experience.type)}`}
      data-position={experience.position}
      aria-label={`${experience.position} at ${experience.company}, ${experience.type}, ${experience.duration}`}
    >
      <div className='experience-card-header'>
        <h3 className='experience-position'>{experience.position}</h3>
        <div className='experience-company'>{experience.company}</div>
        <div className='experience-duration'>{experience.duration}</div>
        <div className='experience-type-container'>
          <span
            className={`experience-type experience-type--${getTypeClassName(experience.type)}`}
          >
            {experience.type}
          </span>
        </div>
      </div>
      <div className='experience-card-content'>
        <p className='experience-description'>{experience.description}</p>
      </div>
    </div>
  );
};

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExperienceCard;
