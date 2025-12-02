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

  const services = t.services.items.map((service, index) => {
    return {
      id: index + 1,
      ...service,
      icon: ['/mobile-200h.png', '/cloud-200h.png', '/desk-200h.png'][index],
      topOffer: index === 0 || index === 2,
      altText: service.imageAlt,
    };
  });

  const experiences = t.experience.items;

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
              {t.hero.heading}
            </h1>
            <p className='hero-text' ref={heroTextRef}>
              {t.hero.text}
            </p>
            <div className='hero-cta-container' ref={heroButtonRef}>
              <a href='#contact' className='hero-cta-btn'>
                <span>{t.hero.cta}</span>
              </a>
            </div>
          </div>
          <img
            alt={t.hero.imageAlt}
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
          <h2 className='services-heading'>{t.services.sectionTitle}</h2>
          <p className='services-text'>{t.services.sectionSubtitle}</p>
        </div>
        <div className='services-cards' ref={servicesCardsRef}>
          {services.map(service => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              alt={service.altText}
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
          <h2 className='experience-heading'>{t.experience.sectionTitle}</h2>
          <p className='experience-text'>{t.experience.sectionSubtitle}</p>
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
