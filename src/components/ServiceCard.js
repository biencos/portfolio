import PropTypes from 'prop-types';
import './ServiceCard.css';

const ServiceCard = ({ icon, title, description, alt }) => (
  <div className='service-card'>
    <div className='service-icon-container'>
      <img alt={alt} src={icon} className='service-icon' />
    </div>
    <div className='service-content'>
      <h3 className='service-title'>{title}</h3>
      <p className='service-description'>{description}</p>
    </div>
  </div>
);

ServiceCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ServiceCard;
