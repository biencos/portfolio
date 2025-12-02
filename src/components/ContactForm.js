import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import useTranslations from '../hooks/useTranslations';
import './ContactForm.css';
import PhoneInput from './PhoneInput';
import {
  validateEmail,
  validatePhone,
  validateProjectIdea,
} from '../utils/formValidation';

const ContactForm = ({
  formData,
  errors = {},
  isSubmitting = false,
  submitMessage = '',
  isValid = false,
  focusedField = null,
  recaptchaRef,
  onInputChange,
  onBlur,
  onFocus,
  onRecaptchaChange,
  onSubmit,
}) => {
  const locale = useTranslations();
  const t = locale.contact.form;
  const getFieldClass = (fieldName, fieldValue) => {
    // If field is focused and has an error, show typing state (navy blue)
    if (focusedField === fieldName && errors[fieldName]) {
      return 'typing';
    }

    // If field has error and is not focused, show error state (red)
    if (errors[fieldName]) {
      return 'error';
    }

    let isValid = false;
    switch (fieldName) {
      case 'email':
        isValid = !validateEmail(fieldValue, locale);
        break;
      case 'phone':
        isValid = !validatePhone(fieldValue, locale);
        break;
      case 'projectIdea':
        isValid = !validateProjectIdea(fieldValue, locale);
        break;
      default:
        isValid = false;
    }

    if (focusedField === fieldName) {
      return isValid && fieldValue ? 'valid' : 'typing';
    }

    if (fieldValue && isValid) {
      return 'valid';
    }

    return 'default';
  };

  const getRequiredClass = (fieldName, fieldValue) => {
    // If field is focused and has an error, show typing state (navy blue)
    if (focusedField === fieldName && errors[fieldName]) {
      return 'required typing';
    }

    // If field has error and is not focused, show error state (red)
    if (errors[fieldName]) {
      return 'required error';
    }

    let isValid = false;
    switch (fieldName) {
      case 'email':
        isValid = !validateEmail(fieldValue, locale);
        break;
      case 'phone':
        isValid = !validatePhone(fieldValue, locale);
        break;
      case 'projectIdea':
        isValid = !validateProjectIdea(fieldValue, locale);
        break;
      default:
        isValid = false;
    }

    if (focusedField === fieldName) {
      return isValid && fieldValue ? 'required valid' : 'required typing';
    }

    if (fieldValue && isValid) {
      return 'required valid';
    }

    return 'required';
  };

  const shouldShowError = fieldName => {
    // Don't show error message when field is focused and has an error
    // (because it shows typing state instead)
    if (focusedField === fieldName && errors[fieldName]) {
      return false;
    }
    return !!errors[fieldName];
  };

  return (
    <div className='contact-form-container'>
      <form
        className='contact-form'
        onSubmit={onSubmit}
        data-testid='contact-form'
      >
        {/* Row with Email and Phone Number */}
        <div className='form-row'>
          {/* Email */}
          <div className='form-field email-field'>
            <label className='field-label'>
              {t.email}
              <span className={getRequiredClass('email', formData.email)}>
                *
              </span>
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={onInputChange}
              onBlur={onBlur}
              onFocus={onFocus}
              placeholder={t.emailPlaceholder}
              className={getFieldClass('email', formData.email)}
            />
            {shouldShowError('email') ? (
              <span className='error-message'>{errors.email}</span>
            ) : (
              <div className='error-placeholder'></div>
            )}
          </div>

          {/* Phone Number */}
          <div className='form-field phone-field'>
            <label className='field-label'>
              {t.phone}
              <span className={getRequiredClass('phone', formData.phone)}>
                *
              </span>
            </label>
            <PhoneInput
              name='phone'
              value={formData.phone}
              onChange={onInputChange}
              onBlur={onBlur}
              onFocus={onFocus}
              fieldClass={getFieldClass('phone', formData.phone)}
              placeholder={t.phonePlaceholder}
            />
            {shouldShowError('phone') ? (
              <span className='error-message'>{errors.phone}</span>
            ) : (
              <div className='error-placeholder'></div>
            )}
          </div>
        </div>

        {/* Project Description */}
        <div className='form-field'>
          <label className='field-label'>
            {t.projectIdea}
            <span
              className={getRequiredClass('projectIdea', formData.projectIdea)}
            >
              *
            </span>
          </label>
          <textarea
            name='projectIdea'
            value={formData.projectIdea}
            onChange={onInputChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={t.projectIdeaPlaceholder}
            rows='7'
            className={getFieldClass('projectIdea', formData.projectIdea)}
          />
          {shouldShowError('projectIdea') ? (
            <span className='error-message'>{errors.projectIdea}</span>
          ) : (
            <div className='error-placeholder'></div>
          )}
        </div>

        {/* Accept Privacy Policy and Terms of Use */}
        <div className='form-field checkbox-field'>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              name='privacyConsent'
              checked={formData.privacyConsent}
              onChange={onInputChange}
              className={`checkbox-input ${errors.privacyConsent ? 'error' : ''}`}
              aria-label={t.privacyConsentAriaLabel}
            />
            <span className='checkbox-text'>
              {t.privacyConsent}
              <a
                href='/privacy-policy'
                target='_blank'
                rel='noopener noreferrer'
              >
                <strong>{t.privacyConsentPrivacy}</strong>
              </a>
              {t.privacyConsentAnd}
              <a href='/terms-of-use' target='_blank' rel='noopener noreferrer'>
                <strong>{t.privacyConsentTerms}</strong>
              </a>
            </span>
          </label>
          {errors.privacyConsent ? (
            <span className='error-message'>{errors.privacyConsent}</span>
          ) : (
            <div className='error-placeholder'></div>
          )}
        </div>

        {/* reCAPTCHA */}
        <div
          className='form-field recaptcha-field'
          role='region'
          aria-label={t.recaptchaLabel}
        >
          {process.env.REACT_APP_RECAPTCHA_SITE_KEY ? (
            <div className='form-field recaptcha-field'>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={onRecaptchaChange}
                theme='dark'
                hl={process.env.REACT_APP_LOCALE || 'en'}
              />
              {errors.recaptchaToken ? (
                <span className='error-message'>{errors.recaptchaToken}</span>
              ) : (
                <div className='error-placeholder'></div>
              )}
            </div>
          ) : (
            <div className='form-field recaptcha-field'>
              <p className='demo-notice'>
                reCAPTCHA verification is not configured in demo mode.
              </p>
              <div className='error-placeholder'></div>
            </div>
          )}
        </div>

        <div className='submit-button-wrapper'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`submit-btn ${isValid ? 'active' : 'disabled'}`}
          >
            {isSubmitting ? t.sending : t.submit}
          </button>
        </div>

        {submitMessage && (
          <div
            className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}
          >
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
    projectIdea: PropTypes.string,
    privacyConsent: PropTypes.bool,
    recaptchaToken: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
    projectIdea: PropTypes.string,
    privacyConsent: PropTypes.string,
    recaptcha: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool,
  submitMessage: PropTypes.string,
  isValid: PropTypes.bool,
  focusedField: PropTypes.string,
  recaptchaRef: PropTypes.shape({
    current: PropTypes.object,
  }),
  onInputChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onRecaptchaChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
