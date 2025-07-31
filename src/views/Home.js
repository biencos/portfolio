import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <Helmet>
        <title>Portfolio</title>
        <meta property='og:title' content='Portfolio' />
      </Helmet>

      {/* Home Section */}
      <div id='home' className='section-separator'></div>
      <Navbar />
      <div className='section-separator'></div>

      {/* Hero Section */}
      <div className='home-hero'>
        <div className='hero-content'>
          <div className='hero-text-container'>
            <h1 className='hero-heading'>
              <span>Build something</span>
              <br />
              <span>great today</span>
            </h1>
            <p className='hero-text'>
              As a software engineer, I help companies deliver the right message
              to their customers.
            </p>
            <div className='hero-cta-container'>
              <a href='#contact' className='hero-cta-btn'>
                <span>Contact me</span>
              </a>
            </div>
          </div>
          <img
            alt='Portfolio showcase on mobile device'
            src='/phone-1400w.png'
            className='hero-image'
          />
        </div>
      </div>

      {/* Services Section */}
      <div id='services' className='section-separator'></div>
      <div className='services-section'>
        <div className='services-header'>
          <h2 className='services-heading'>Services</h2>
          <p className='services-text'>What I can offer</p>
        </div>
        <div className='services-cards'>
          <ServiceCard
            icon='/mobile-200h.png'
            alt='Mobile application development icon'
            title='Mobile Applications'
            description='Do you want to turn your requirements into beautiful mobile apps? Let me help!'
          />
          <ServiceCard
            icon='/cloud-200h.png'
            alt='Cloud migration services icon'
            title='Cloud Migration'
            description='Do you want to use cloud architecture like AWS in your product? Let me help!'
          />
          <ServiceCard
            icon='/desk-200h.png'
            alt='Freelancing services icon'
            title='Freelancing'
            description='Do you want someone extra to help out building of your product? Let me help!'
          />
        </div>
      </div>

      {/* Experience Section */}
      <div id='experience' className='section-separator'></div>
      <div className='section-placeholder'>
        <h2>Experience</h2>
        <p>Coming soon...</p>
      </div>

      {/* Contact Section */}
      <div id='contact' className='section-separator'></div>
      <div className='section-placeholder'>
        <h2>Contact</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default Home;
