import {
  validatePhone,
  validateEmail,
  validateProjectIdea,
  validateConsent,
  validateContactForm,
  isFormValid,
} from '../formValidation';

describe('Form Validation Utils', () => {
  describe('validateEmail', () => {
    test('validates required email', () => {
      expect(validateEmail('')).toBe('Email is required');
      expect(validateEmail(null)).toBe('Email is required');
      expect(validateEmail(undefined)).toBe('Email is required');
    });

    test('validates invalid email formats', () => {
      expect(validateEmail('invalid')).toBe('Please provide a valid email');
      expect(validateEmail('invalid@')).toBe('Please provide a valid email');
      expect(validateEmail('invalid@domain')).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('@domain.com')).toBe('Please provide a valid email');
      expect(validateEmail('user@')).toBe('Please provide a valid email');
      expect(validateEmail('user@domain')).toBe('Please provide a valid email');
      expect(validateEmail('user.domain.com')).toBe(
        'Please provide a valid email'
      );
    });

    test('validates valid email formats', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name@domain.co.uk')).toBeNull();
      expect(validateEmail('user+tag@domain.org')).toBeNull();
      expect(validateEmail('user_name@domain-name.com')).toBeNull();
    });
  });

  describe('validatePhone', () => {
    test('validates required phone number', () => {
      expect(validatePhone('')).toBe('Phone number is required');
      expect(validatePhone(null)).toBe('Phone number is required');
      expect(validatePhone(undefined)).toBe('Phone number is required');
    });

    test('validates invalid phone numbers', () => {
      expect(validatePhone('123')).toBe('Please provide a valid phone number');
      expect(validatePhone('12345')).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('123abc4567')).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('abc1234567')).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('invalid')).toBe(
        'Please provide a valid phone number'
      );
    });

    test('validates valid phone numbers', () => {
      expect(validatePhone('+48123456789')).toBeNull(); // Polish number
      expect(validatePhone('+14155552671')).toBeNull(); // US number
      expect(validatePhone('+447911123456')).toBeNull(); // UK number
      expect(validatePhone('+33123456789')).toBeNull(); // French number
      expect(validatePhone('+12345678901')).toBeNull(); // US formatted
    });

    test('handles phone parsing errors gracefully', () => {
      expect(validatePhone('++123')).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('++')).toBe('Please provide a valid phone number');
    });
  });

  describe('validateProjectIdea', () => {
    test('validates required project idea', () => {
      expect(validateProjectIdea('')).toBe('Project description is required');
      expect(validateProjectIdea(null)).toBe('Project description is required');
      expect(validateProjectIdea(undefined)).toBe(
        'Project description is required'
      );
    });

    test('validates minimum length requirement', () => {
      expect(validateProjectIdea('short')).toBe(
        'Please provide more details (minimum 12 characters)'
      );
      expect(validateProjectIdea('11 chars!!')).toBe(
        'Please provide more details (minimum 12 characters)'
      );
    });

    test('validates valid project descriptions', () => {
      expect(
        validateProjectIdea('This is a valid project description')
      ).toBeNull();
      expect(validateProjectIdea('Exactly12chr')).toBeNull(); // Fixed: now 12 chars
      expect(
        validateProjectIdea(
          'A much longer project description with lots of details'
        )
      ).toBeNull();
    });
  });

  describe('validateConsent', () => {
    test('validates required consent', () => {
      expect(validateConsent(false)).toBe('consent is required');
      expect(validateConsent(false, 'Privacy')).toBe('Privacy is required');
    });

    test('validates given consent', () => {
      expect(validateConsent(true)).toBeNull();
      expect(validateConsent(true, 'Privacy')).toBeNull();
    });
  });

  describe('validateContactForm', () => {
    const validFormData = {
      email: 'test@example.com',
      phone: '+14155552671',
      projectIdea: 'This is a valid project description',
      privacyConsent: true,
      recaptchaToken: 'test-token',
    };

    test('validates valid form data', () => {
      const errors = validateContactForm(validFormData);
      expect(errors).toEqual({});
    });

    test('validates form with all errors', () => {
      const invalidFormData = {
        email: '',
        phone: '',
        projectIdea: '',
        privacyConsent: false,
      };

      const errors = validateContactForm(invalidFormData);
      expect(errors).toEqual({
        email: 'Email is required',
        phone: 'Phone number is required',
        projectIdea: 'Project description is required',
        privacyConsent: 'Privacy consent is required',
        recaptchaToken: 'Verification is required',
      });
    });

    test('validates individual field errors', () => {
      const formDataWithEmailError = {
        ...validFormData,
        email: 'invalid-email',
      };

      const errors = validateContactForm(formDataWithEmailError);
      expect(errors.email).toBe('Please provide a valid email');
      expect(Object.keys(errors)).toHaveLength(1);
    });

    test('validates phone number errors', () => {
      const formDataWithPhoneError = {
        ...validFormData,
        phone: 'invalid',
      };

      const errors = validateContactForm(formDataWithPhoneError);
      expect(errors.phone).toBe('Please provide a valid phone number');
    });

    test('validates project idea length errors', () => {
      const formDataWithProjectError = {
        ...validFormData,
        projectIdea: 'short',
      };

      const errors = validateContactForm(formDataWithProjectError);
      expect(errors.projectIdea).toBe(
        'Please provide more details (minimum 12 characters)'
      );
    });
  });

  describe('isFormValid', () => {
    test('returns true for empty errors object', () => {
      expect(isFormValid({})).toBe(true);
    });

    test('returns false for errors object with errors', () => {
      expect(isFormValid({ email: 'Email is required' })).toBe(false);
      expect(
        isFormValid({
          email: 'Email is required',
          phone: 'Phone is required',
        })
      ).toBe(false);
    });

    test('returns false for errors object with any keys', () => {
      expect(isFormValid({ email: null, phone: null })).toBe(false);
      expect(isFormValid({ email: '', phone: '' })).toBe(false);
      expect(isFormValid({ email: 'Email is required' })).toBe(false);
    });
  });
});
