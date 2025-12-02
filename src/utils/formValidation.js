/**
 * Form validation utilities
 * Centralized validation logic for contact forms with locale support
 */

import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Get validation messages from locale
 * @param {object} locale - Locale object containing validation messages
 * @returns {object} Validation messages object
 */
const getValidationMessages = locale => ({
  emailRequired: locale.contact.form.validation.emailRequired,
  emailInvalid: locale.contact.form.validation.emailInvalid,
  phoneRequired: locale.contact.form.validation.phoneRequired,
  phoneInvalid: locale.contact.form.validation.phoneInvalid,
  projectRequired: locale.contact.form.validation.projectRequired,
  projectTooShort: locale.contact.form.validation.projectTooShort,
  privacyRequired: locale.contact.form.validation.privacyRequired,
  recaptchaRequired: locale.contact.form.validation.recaptchaRequired,
});

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @param {object} locale - Locale object for messages
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = (email, locale) => {
  const messages = getValidationMessages(locale);
  if (!email) return messages.emailRequired;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return messages.emailInvalid;
  }

  return null;
};

/**
 * Validate phone number using libphonenumber-js
 * @param {string} phone - Phone number to validate
 * @param {object} locale - Locale object for messages
 * @returns {string|null} Error message or null if valid
 */
export const validatePhone = (phone, locale) => {
  const messages = getValidationMessages(locale);
  if (!phone) return messages.phoneRequired;

  try {
    const phoneNumber = parsePhoneNumberFromString(phone);

    if (!phoneNumber) {
      return messages.phoneInvalid;
    }

    if (!phoneNumber.isValid()) {
      return messages.phoneInvalid;
    }

    return null;
  } catch {
    return messages.phoneInvalid;
  }
};

/**
 * Validate project description
 * @param {string} projectIdea - Project description to validate
 * @param {object} locale - Locale object for messages
 * @returns {string|null} Error message or null if valid
 */
export const validateProjectIdea = (projectIdea, locale) => {
  const messages = getValidationMessages(locale);
  if (!projectIdea) return messages.projectRequired;

  if (projectIdea.length < 12) {
    return messages.projectTooShort;
  }

  return null;
};

/**
 * Validate checkbox consent
 * @param {boolean} isChecked - Checkbox state
 * @param {object} locale - Locale object for messages
 * @returns {string|null} Error message or null if valid
 */
export const validateConsent = (isChecked, locale) => {
  const messages = getValidationMessages(locale);
  if (!isChecked) {
    return messages.privacyRequired;
  }
  return null;
};

/**
 * Validate entire contact form
 * @param {object} formData - Form data object
 * @param {object} locale - Locale object for messages
 * @returns {object} Validation errors object
 */
export const validateContactForm = (formData, locale) => {
  const errors = {};

  const emailError = validateEmail(formData.email, locale);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(formData.phone, locale);
  if (phoneError) errors.phone = phoneError;

  const projectError = validateProjectIdea(formData.projectIdea, locale);
  if (projectError) errors.projectIdea = projectError;

  const privacyError = validateConsent(formData.privacyConsent, locale);
  if (privacyError) errors.privacyConsent = privacyError;

  const messages = getValidationMessages(locale);

  // reCAPTCHA validation (require in production or when configured)
  const isProduction = process.env.NODE_ENV === 'production';
  const hasRecaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  if ((isProduction || hasRecaptchaKey) && !formData.recaptchaToken) {
    errors.recaptchaToken = messages.recaptchaRequired;
  }

  return errors;
};

/**
 * Check if form is valid (no errors)
 * @param {object} errors - Errors object
 * @returns {boolean} True if form is valid
 */
export const isFormValid = errors => {
  return Object.keys(errors).length === 0;
};
