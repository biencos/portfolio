import PropTypes from 'prop-types';
import './ExperienceCard.css';

const ExperienceCard = ({ experience }) => {
  return (
    <div
      className={`experience-card experience-card--${experience.type}`}
      data-position={experience.position}
    >
      <div className='experience-card-header'>
        <h3 className='experience-position'>{experience.position}</h3>
        <div className='experience-company'>{experience.company}</div>
        <div className='experience-duration'>{experience.duration}</div>
        <div className='experience-type-container'>
          <span
            className={`experience-type experience-type--${experience.type}`}
          >
            {experience.type === 'freelance' ? 'Freelance' : 'Full-time'}
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
