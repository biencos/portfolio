import ContactForm from './ContactForm';
import useContactForm from '../hooks/useContactForm';
import './Contact.css';

const Contact = () => {
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

  return (
    <section className='contact' id='contact'>
      <div className='container'>
        <div className='contact-header'>
          <h2 className='contact-heading'>Contact</h2>
          <p className='contact-text'>Let&apos;s Work Together</p>
        </div>

        <div className='contact-content'>
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
