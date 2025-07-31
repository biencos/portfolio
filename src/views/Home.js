import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Portfolio</title>
        <meta property="og:title" content="Portfolio" />
      </Helmet>
      
      {/* Home Section */}
      <div id="home" className="section-separator"></div>
      <Navbar />
      <div className="section-separator"></div>
      
      <div className="home-content">
        <h1>Welcome to Portfolio</h1>
        <p>Under construction...</p>
      </div>
      
      {/* Services Section */}
      <div id="services" className="section-separator"></div>
      <div className="section-placeholder">
        <h2>Services</h2>
        <p>Coming soon...</p>
      </div>
      
      {/* Experience Section */}
      <div id="experience" className="section-separator"></div>
      <div className="section-placeholder">
        <h2>Experience</h2>
        <p>Coming soon...</p>
      </div>
      
      {/* Contact Section */}
      <div id="contact" className="section-separator"></div>
      <div className="section-placeholder">
        <h2>Contact</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default Home;
