import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-logo-section'>
          <img
            alt='Portfolio logo'
            src='/logo_light.svg'
            className='footer-logo'
            onError={e => {
              e.target.src = '/logo_dark.svg';
            }}
          />
        </div>

        <div className='footer-links'>
          <a
            href='/privacy-policy'
            className='footer-link'
            aria-label='Privacy Policy'
          >
            Privacy Policy
          </a>
          <a
            href='/terms-of-use'
            className='footer-link'
            aria-label='Terms of Use'
          >
            Terms of Use
          </a>
          <a
            href='https://github.com/biencos'
            className='footer-link'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub Profile'
          >
            GitHub
          </a>
        </div>

        <div className='footer-copyright'>
          <p>&copy; Copyrighted by biencos, {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
