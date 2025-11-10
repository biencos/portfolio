import PropTypes from 'prop-types';
import './ServiceCard.css';

const ServiceCard = ({
  icon,
  title,
  description,
  alt,
  topOffer = false,
  onClick = () => {},
}) => (
  <div
    className='service-card'
    onClick={onClick}
    role='button'
    tabIndex={0}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    {topOffer && <div className='top-offer-badge'>Top Offer</div>}
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
  topOffer: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ServiceCard;
