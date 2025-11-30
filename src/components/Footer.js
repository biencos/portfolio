import useTranslations from '../hooks/useTranslations';
import './Footer.css';

const Footer = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-logo-section'>
          <img
            alt={t.footer.logoAlt}
            src='/logo_light.svg'
            className='footer-logo'
          />
        </div>

        <div className='footer-links'>
          <a
            href='/privacy-policy'
            className='footer-link'
            aria-label={t.footer.ariaLabels.privacyPolicy}
          >
            {t.footer.links.privacyPolicy}
          </a>
          <a
            href='/terms-of-use'
            className='footer-link'
            aria-label={t.footer.ariaLabels.termsOfUse}
          >
            {t.footer.links.termsOfUse}
          </a>
          <a
            href='https://github.com/biencos'
            className='footer-link'
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t.footer.ariaLabels.github}
          >
            {t.footer.links.github}
          </a>
        </div>

        <div className='footer-copyright'>
          <p>{t.footer.copyright.replace('{year}', currentYear.toString())}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
