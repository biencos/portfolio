import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
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

const getEmailJSConfig = () => ({
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
});

const isEmailJSConfigured = config =>
  config.serviceId && config.templateId && config.publicKey;

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
        const formattedPhone = formatPhoneForEmail(formData.phone);
        const templateParams = {
          from_email: formData.email,
          phone_number: formattedPhone,
          project_idea: formData.projectIdea,
          submission_time: new Date().toLocaleString(),
        };

        const emailConfig = getEmailJSConfig();

        if (!isEmailJSConfigured(emailConfig)) {
          await new Promise(resolve => setTimeout(resolve, 1500));

          if (
            process.env.NODE_ENV === 'development' ||
            process.env.NODE_ENV === 'test'
          ) {
            // eslint-disable-next-line no-console
            console.log('EmailJS not configured. Form data:', templateParams);
          }
          if (process.env.NODE_ENV === 'test') {
            setSubmitMessage(locale.contact.form.messages.successSubmit);
            resetFormState(setFormData, setErrors, recaptchaRef);
            return;
          }
        } else {
          await emailjs.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            templateParams,
            emailConfig.publicKey
          );
        }

        resetFormState(setFormData, setErrors, recaptchaRef);

        if (process.env.NODE_ENV !== 'test') {
          navigate('/thank-you');
        } else {
          setSubmitMessage(locale.contact.form.messages.successSubmit);
        }
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
