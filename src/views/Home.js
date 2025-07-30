import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Portfolio</title>
        <meta property="og:title" content="Portfolio" />
      </Helmet>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}>
        <h1>Welcome to Portfolio</h1>
        <p>Under construction...</p>
      </div>
    </div>
  );
};

export default Home;
