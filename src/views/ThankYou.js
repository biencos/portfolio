import { useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='thank-you-page'>
      <div className='thank-you-container'>
        <div className='thank-you-content'>
          <h1 className='thank-you-title'>Thank You!</h1>
          <p className='thank-you-message'>
            We will respond to your request within 24 hours
          </p>
          <button
            className='go-home-button'
            onClick={handleGoHome}
            aria-label='Return to home page'
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
