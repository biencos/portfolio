import { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import useContactForm from '../hooks/useContactForm';
import useTranslations from '../hooks/useTranslations';
import './Contact.css';

const Contact = () => {
  const t = useTranslations();
  const contactHeaderRef = useRef(null);
  const contactContentRef = useRef(null);

  const {
    formData,
    errors,
    isSubmitting,
    submitMessage,
    isValid,
    focusedField,
    recaptchaRef,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    handleRecaptchaChange,
    handleSubmit,
    handleValidationClick,
  } = useContactForm();

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
      contactHeaderRef.current,
      contactContentRef.current,
    ].filter(Boolean);

    elementsToObserve.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section className='contact' id='contact'>
      <div className='container'>
        <div className='contact-header' ref={contactHeaderRef}>
          <h2 className='contact-heading'>{t.contact.sectionTitle}</h2>
          <p className='contact-text'>{t.contact.sectionSubtitle}</p>
        </div>

        <div className='contact-content' ref={contactContentRef}>
          <ContactForm
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            isValid={isValid}
            focusedField={focusedField}
            recaptchaRef={recaptchaRef}
            onInputChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onRecaptchaChange={handleRecaptchaChange}
            onSubmit={handleSubmit}
            onValidationClick={handleValidationClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
