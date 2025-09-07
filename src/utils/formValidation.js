/**
 * Form validation utilities
 * Centralized validation logic for contact forms
 */

import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateEmail = email => {
  if (!email) return 'Email is required';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please provide a valid email';
  }

  return null;
};

/**
 * Validate phone number using libphonenumber-js
 * @param {string} phone - Phone number to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePhone = phone => {
  if (!phone) return 'Phone number is required';

  try {
    const phoneNumber = parsePhoneNumberFromString(phone);

    if (!phoneNumber) {
      return 'Please provide a valid phone number';
    }

    if (!phoneNumber.isValid()) {
      return 'Please provide a valid phone number';
    }

    return null;
  } catch {
    return 'Please provide a valid phone number';
  }
};

/**
 * Validate project description
 * @param {string} projectIdea - Project description to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateProjectIdea = projectIdea => {
  if (!projectIdea) return 'Project description is required';

  if (projectIdea.length < 12) {
    return 'Please provide more details (minimum 12 characters)';
  }

  return null;
};

/**
 * Validate checkbox consent
 * @param {boolean} isChecked - Checkbox state
 * @param {string} fieldName - Name of the field for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateConsent = (isChecked, fieldName = 'consent') => {
  if (!isChecked) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate entire contact form
 * @param {object} formData - Form data object
 * @returns {object} Validation errors object
 */
export const validateContactForm = formData => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const projectError = validateProjectIdea(formData.projectIdea);
  if (projectError) errors.projectIdea = projectError;

  const privacyError = validateConsent(
    formData.privacyConsent,
    'Privacy consent'
  );
  if (privacyError) errors.privacyConsent = 'Privacy consent is required';

  // reCAPTCHA validation
  if (!formData.recaptchaToken) {
    errors.recaptchaToken = 'Verification is required';
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
