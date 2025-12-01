import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import useTranslations from './useTranslations';
import { validateContactForm, isFormValid } from '../utils/formValidation';

const INITIAL_FORM_DATA = {
  email: '',
  phone: '',
  projectIdea: '',
  privacyConsent: false,
  recaptchaToken: null,
};

const PHONE_MIN_LENGTH = 8;

/**
 * Format phone number for email display
 */
const formatPhoneForEmail = phone => {
  try {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber?.isValid()
      ? phoneNumber.formatInternational()
      : phone || '';
  } catch {
    return phone || '';
  }
};

/**
 * Send email via Netlify Function (backend)
 * All sensitive credentials are handled server-side
 */
const sendEmailViaFunction = async formData => {
  const response = await fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.email,
      phone: formatPhoneForEmail(formData.phone),
      projectIdea: formData.projectIdea,
      recaptchaToken: formData.recaptchaToken,
    }),
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Function error response:', errorData);
    }
    throw new Error(
      errorData.error || errorData.details || 'Failed to send email'
    );
  }

  return response.json();
};

/**
 * Check if running in demo/mock mode
 * Returns true when running in demo (no emails sent):
 * - REACT_APP_MOCK_MODE=true explicitly set
 * - Missing REACT_APP_RESEND_API_KEY
 * - In test environment (NODE_ENV=test)
 */
const isInDemoMode = () => {
  // Explicit mock mode: always demo, ignore everything else
  if (process.env.REACT_APP_MOCK_MODE === 'true') {
    return true;
  }

  // Test environment always uses demo mode
  if (process.env.NODE_ENV === 'test') {
    return true;
  }

  // If no Resend API key, use demo mode
  if (!process.env.REACT_APP_RESEND_API_KEY) {
    return true;
  }

  // Otherwise, real mode (have API key configured)
  return false;
};

/**
 * Reset form to initial state
 */
const resetFormState = (setFormData, setErrors, recaptchaRef) => {
  setFormData(INITIAL_FORM_DATA);
  setErrors({});
  recaptchaRef.current?.reset();
};

const useContactForm = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const locale = useTranslations();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = useCallback(
    e => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;

      setFormData(prev => ({
        ...prev,
        [name]: newValue,
      }));

      const shouldClearError =
        errors[name] &&
        (newValue ||
          (name === 'phone' && newValue?.length >= PHONE_MIN_LENGTH));

      if (shouldClearError) {
        setErrors(prev => ({
          ...prev,
          [name]: null,
        }));
      }

      if (type === 'checkbox' && !checked && name === 'privacyConsent') {
        setErrors(prev => ({
          ...prev,
          [name]: locale.contact.form.validation.privacyRequired,
        }));
      }
    },
    [errors, locale]
  );

  const handleInputBlur = useCallback(
    e => {
      const { name } = e.target;
      const formErrors = validateContactForm(formData, locale);

      if (formErrors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: formErrors[name],
        }));
      }

      setFocusedField(null);
    },
    [formData, locale]
  );

  const handleInputFocus = useCallback(e => {
    const { name } = e.target;
    setFocusedField(name);
  }, []);

  const handleRecaptchaChange = useCallback(
    token => {
      setFormData(prev => ({
        ...prev,
        recaptchaToken: token,
      }));

      if (token && errors.recaptchaToken) {
        setErrors(prev => ({
          ...prev,
          recaptchaToken: null,
        }));
      }
    },
    [errors.recaptchaToken]
  );

  const handleValidationClick = useCallback(() => {
    const formErrors = validateContactForm(formData, locale);
    setErrors(formErrors);
  }, [formData, locale]);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitMessage('');

      const formErrors = validateContactForm(formData, locale);
      setErrors(formErrors);

      if (!isFormValid(formErrors)) {
        setIsSubmitting(false);
        return;
      }

      try {
        // In demo/development mode, simulate email sending
        if (isInDemoMode()) {
          await new Promise(resolve => setTimeout(resolve, 1500));

          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('Demo mode: Form data would be sent:', formData);
          }

          setSubmitMessage(
            'Thank you! Your message has been received. (Demo mode - email not sent)'
          );
          resetFormState(setFormData, setErrors, recaptchaRef);
          return;
        }

        // Production: Send via Netlify Function
        await sendEmailViaFunction(formData);

        resetFormState(setFormData, setErrors, recaptchaRef);
        navigate('/thank-you');
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Email send failed:', error);
        }
        setSubmitMessage(locale.contact.form.messages.errorSubmit);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, locale, navigate, recaptchaRef]
  );

  const currentErrors = validateContactForm(formData, locale);
  const isValid = isFormValid(currentErrors);

  return {
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
  };
};

export default useContactForm;
