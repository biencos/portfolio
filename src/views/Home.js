import { Helmet } from 'react-helmet';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import ExperienceCard from '../components/ExperienceCard';
import ClientFlags from '../components/ClientFlags';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useTranslations from '../hooks/useTranslations';
import './Home.css';

const Home = () => {
  const t = useTranslations();
  const heroImageRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroButtonRef = useRef(null);
  const servicesHeaderRef = useRef(null);
  const servicesCardsRef = useRef(null);
  const experienceHeaderRef = useRef(null);
  const experienceCardsRef = useRef(null);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elementsToObserve = [
      heroImageRef.current,
      heroHeadingRef.current,
      heroTextRef.current,
      heroButtonRef.current,
      servicesHeaderRef.current,
      servicesCardsRef.current,
      experienceHeaderRef.current,
      experienceCardsRef.current,
    ].filter(Boolean);

    elementsToObserve.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: 'Mobile Applications',
      description:
        'Do you want to turn your requirements into beautiful mobile apps?\n\nLet me help!',
      icon: '/mobile-200h.png',
      topOffer: true,
    },
    {
      id: 2,
      title: 'Cloud Migration',
      description:
        'Do you want to use cloud architecture like AWS in your product?\n\nLet me help!',
      icon: '/cloud-200h.png',
    },
    {
      id: 3,
      title: 'Freelancing',
      description:
        'Do you want someone extra to help out building of your product?\n\nLet me help!',
      icon: '/desk-200h.png',
      topOffer: true,
    },
  ];

  const experiences = [
    {
      id: 1,
      position: 'Freelance Developer',
      company: 'Independent',
      duration: '2021 - Present',
      type: 'freelance',
      description:
        'Building custom web applications and consulting for various clients.\n\nSpecialized in React, Node.js, and cloud solutions.\n\n...',
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Digital Innovations',
      duration: '2021 - 2023',
      type: 'full-time',
      description:
        'Built responsive web applications with beatiful UI and RESTful APIs.\n\nImplemented CI/CD pipelines and reduced deployment time by 50%.\n\n...',
    },
    {
      id: 3,
      position: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      duration: '2023 - Present',
      type: 'full-time',
      description:
        'Lead development of scalable web applications using AWS.\n\nMentored junior developers and improved team productivity by 30%.\n\n...',
    },
  ];

  return (
    <div className='home-container'>
      <Helmet>
        <title>{t.site.title}</title>
        <meta property='og:title' content={t.site.title} />
      </Helmet>

      {/* Home Section */}
      <div id='home' className='section-separator'></div>
      <Navbar />

      {/* Hero Section */}
      <div className='home-hero'>
        <div className='hero-content'>
          <div className='hero-text-container'>
            <h1 className='hero-heading' ref={heroHeadingRef}>
              Build Something
              <br />
              Amazing Today
            </h1>
            <p className='hero-text' ref={heroTextRef}>
              As a software engineer, I help{' '}
              <span className='mobile-break'>companies around the world.</span>
            </p>
            <div className='hero-cta-container' ref={heroButtonRef}>
              <a href='#contact' className='hero-cta-btn'>
                <span>Contact me</span>
              </a>
            </div>
          </div>
          <img
            alt='Portfolio showcase on mobile device'
            src='/phone-1400w.png'
            className='hero-image'
            ref={heroImageRef}
          />
        </div>
      </div>

      {/* Services Section */}
      <div id='services' className='section-separator'></div>
      <div className='services-section'>
        <div className='services-header' ref={servicesHeaderRef}>
          <h2 className='services-heading'>Services</h2>
          <p className='services-text'>What I can offer</p>
        </div>
        <div className='services-cards' ref={servicesCardsRef}>
          {services.map(service => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              alt={`${service.title} icon`}
              title={service.title}
              description={service.description}
              topOffer={service.topOffer}
              onClick={scrollToContact}
            />
          ))}
        </div>
      </div>

      {/* Client Flags Section */}
      <div className='section-separator'></div>
      <ClientFlags />

      {/* Experience Section */}
      <div id='experience' className='section-separator'></div>
      <section className='experience-section'>
        <div className='experience-header' ref={experienceHeaderRef}>
          <h2 className='experience-heading'>Professional Experience</h2>
          <p className='experience-text'>My journey in software development</p>
        </div>
        <div className='experience-cards' ref={experienceCardsRef}>
          {experiences.map(experience => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <div id='contact' className='section-separator'></div>
      <Contact />

      {/* Footer */}
      <div className='section-separator'></div>
      <Footer />
    </div>
  );
};

export default Home;
