import {
  validatePhone,
  validateEmail,
  validateProjectIdea,
  validateConsent,
  validateContactForm,
  isFormValid,
} from '../formValidation';

// Mock locale for testing
const mockLocale = {
  contact: {
    form: {
      validation: {
        emailRequired: 'Email is required',
        emailInvalid: 'Please provide a valid email',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please provide a valid phone number',
        projectRequired: 'Project description is required',
        projectTooShort: 'Please provide more details (minimum 12 characters)',
        privacyRequired: 'Privacy consent is required',
        recaptchaRequired: 'Verification is required',
      },
    },
  },
};

describe('Form Validation Utils', () => {
  describe('validateEmail', () => {
    test('validates required email', () => {
      expect(validateEmail('', mockLocale)).toBe('Email is required');
      expect(validateEmail(null, mockLocale)).toBe('Email is required');
      expect(validateEmail(undefined, mockLocale)).toBe('Email is required');
    });

    test('validates invalid email formats', () => {
      expect(validateEmail('invalid', mockLocale)).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('invalid@', mockLocale)).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('invalid@domain', mockLocale)).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('@domain.com', mockLocale)).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('user@', mockLocale)).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('user@domain', mockLocale)).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('user.domain.com', mockLocale)).toBe(
        'Please provide a valid email'
      );
    });

    test('validates valid email formats', () => {
      expect(validateEmail('test@example.com', mockLocale)).toBeNull();
      expect(validateEmail('user.name@domain.co.uk', mockLocale)).toBeNull();
      expect(validateEmail('user+tag@domain.org', mockLocale)).toBeNull();
      expect(validateEmail('user_name@domain-name.com', mockLocale)).toBeNull();
    });
  });

  describe('validatePhone', () => {
    test('validates required phone number', () => {
      expect(validatePhone('', mockLocale)).toBe('Phone number is required');
      expect(validatePhone(null, mockLocale)).toBe('Phone number is required');
      expect(validatePhone(undefined, mockLocale)).toBe(
        'Phone number is required'
      );
    });

    test('validates invalid phone numbers', () => {
      expect(validatePhone('123', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('12345', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('123abc4567', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('abc1234567', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('invalid', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
    });

    test('validates valid phone numbers', () => {
      expect(validatePhone('+48123456789', mockLocale)).toBeNull(); // Polish number
      expect(validatePhone('+14155552671', mockLocale)).toBeNull(); // US number
      expect(validatePhone('+447911123456', mockLocale)).toBeNull(); // UK number
      expect(validatePhone('+33123456789', mockLocale)).toBeNull(); // French number
      expect(validatePhone('+12345678901', mockLocale)).toBeNull(); // US formatted
    });

    test('handles phone parsing errors gracefully', () => {
      expect(validatePhone('++123', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('++', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
    });
  });

  describe('validateProjectIdea', () => {
    test('validates required project idea', () => {
      expect(validateProjectIdea('', mockLocale)).toBe(
        'Project description is required'
      );
      expect(validateProjectIdea(null, mockLocale)).toBe(
        'Project description is required'
      );
      expect(validateProjectIdea(undefined, mockLocale)).toBe(
        'Project description is required'
      );
    });

    test('validates minimum length requirement', () => {
      expect(validateProjectIdea('short', mockLocale)).toBe(
        'Please provide more details (minimum 12 characters)'
      );
      expect(validateProjectIdea('11 chars!!', mockLocale)).toBe(
        'Please provide more details (minimum 12 characters)'
      );
    });

    test('validates valid project descriptions', () => {
      expect(
        validateProjectIdea('This is a valid project description', mockLocale)
      ).toBeNull();
      expect(validateProjectIdea('Exactly12chr', mockLocale)).toBeNull(); // Fixed: now 12 chars
      expect(
        validateProjectIdea(
          'A much longer project description with lots of details',
          mockLocale
        )
      ).toBeNull();
    });
  });

  describe('validateConsent', () => {
    test('validates required consent', () => {
      expect(validateConsent(false, mockLocale)).toBe(
        'Privacy consent is required'
      );
    });

    test('validates given consent', () => {
      expect(validateConsent(true, mockLocale)).toBeNull();
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
      const errors = validateContactForm(validFormData, mockLocale);
      expect(errors).toEqual({});
    });

    test('validates form with all errors', () => {
      const invalidFormData = {
        email: '',
        phone: '',
        projectIdea: '',
        privacyConsent: false,
      };

      const errors = validateContactForm(invalidFormData, mockLocale);
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

      const errors = validateContactForm(formDataWithEmailError, mockLocale);
      expect(errors.email).toBe('Please provide a valid email');
      expect(Object.keys(errors)).toHaveLength(1);
    });

    test('validates phone number errors', () => {
      const formDataWithPhoneError = {
        ...validFormData,
        phone: 'invalid',
      };

      const errors = validateContactForm(formDataWithPhoneError, mockLocale);
      expect(errors.phone).toBe('Please provide a valid phone number');
    });

    test('validates project idea length errors', () => {
      const formDataWithProjectError = {
        ...validFormData,
        projectIdea: 'short',
      };

      const errors = validateContactForm(formDataWithProjectError, mockLocale);
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
