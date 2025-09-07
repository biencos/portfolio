import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import ExperienceCard from '../components/ExperienceCard';
import ClientFlags from '../components/ClientFlags';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const services = [
    {
      id: 1,
      title: 'Mobile Applications',
      description:
        'Do you want to turn your requirements into beautiful mobile apps? Let me help!',
      icon: '/mobile-200h.png',
    },
    {
      id: 2,
      title: 'Cloud Migration',
      description:
        'Do you want to use cloud architecture like AWS in your product? Let me help!',
      icon: '/cloud-200h.png',
    },
    {
      id: 3,
      title: 'Freelancing',
      description:
        'Do you want someone extra to help out building of your product? Let me help!',
      icon: '/desk-200h.png',
    },
  ];

  const experiences = [
    {
      id: 1,
      position: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      duration: '2023 - Present',
      type: 'full-time',
      description:
        'Lead development of scalable web applications using React, Node.js, and AWS. Mentored junior developers and improved team productivity by 30%.',
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Digital Innovations',
      duration: '2021 - 2023',
      type: 'full-time',
      description:
        'Built responsive web applications and RESTful APIs. Implemented CI/CD pipelines and reduced deployment time by 50%.',
    },
    {
      id: 3,
      position: 'Freelance Developer',
      company: 'Independent',
      duration: '2021 - Present',
      type: 'freelance',
      description:
        'Building custom web applications and consulting for various clients. Specialized in React, Node.js, and cloud solutions.',
    },
  ];

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
          {services.map(service => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              alt={`${service.title} icon`}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div id='experience' className='section-separator'></div>
      <section className='experience-section'>
        <div className='experience-header'>
          <h2 className='experience-heading'>Professional Experience</h2>
          <p className='experience-text'>
            Key roles and achievements in my development career
          </p>
        </div>

        <div className='experience-grid'>
          {experiences.map(experience => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>

      {/* Client Flags Section */}
      <div className='section-separator'></div>
      <ClientFlags />

      {/* Contact Section */}
      <div id='contact' className='section-separator'></div>
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
