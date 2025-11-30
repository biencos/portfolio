import { useNavigate } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';
import './ThankYou.css';

const ThankYou = () => {
  const navigate = useNavigate();
  const t = useTranslations();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='thank-you-page'>
      <div className='thank-you-container'>
        <div className='thank-you-content'>
          <h1 className='thank-you-title'>{t.thankYou.title}</h1>
          <p className='thank-you-message'>{t.thankYou.message}</p>
          <button
            className='go-home-button'
            onClick={handleGoHome}
            aria-label={t.thankYou.buttonAriaLabel}
            type='button'
          >
            {t.thankYou.button}
          </button>
        </div>
      </div>
    </div>
  );
};

ThankYou.propTypes = {};

export default ThankYou;
