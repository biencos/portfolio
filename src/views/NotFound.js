import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import useTranslations from '../hooks/useTranslations';

const NotFound = () => {
  const navigate = useNavigate();
  const t = useTranslations();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <Helmet>
        <title>{t.notFound.title}</title>
      </Helmet>
      <h3>{t.notFound.pageNotFoundHeading}</h3>
      <h1 style={{ fontSize: '4rem', margin: '1rem 0' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>{t.notFound.description}</h2>
      <button
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
        aria-label={t.notFound.ariaLabel}
      >
        {t.notFound.button}
      </button>
    </div>
  );
};

export default NotFound;
