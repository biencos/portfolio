import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      flexDirection: 'column',
      textAlign: 'center',
    }}>
      <Helmet>
        <title>404 - Not Found</title>
      </Helmet>
      <h3>OOPS! PAGE NOT FOUND</h3>
      <h1 style={{ fontSize: '4rem', margin: '1rem 0' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>
        WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND
      </h2>
      <button
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => history.push('/')}
        aria-label="Go to home page"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
