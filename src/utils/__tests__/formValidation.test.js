import {
  validateEmail,
  validatePhone,
  validateProjectIdea,
  validateConsent,
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

describe('formValidation', () => {
  describe('validateEmail', () => {
    test('validates correct email addresses', () => {
      expect(validateEmail('test@example.com', mockLocale)).toBeNull();
      expect(validateEmail('user@domain.org', mockLocale)).toBeNull();
      expect(
        validateEmail('name.surname@company.co.uk', mockLocale)
      ).toBeNull();
    });

    test('rejects invalid email addresses', () => {
      expect(validateEmail('', mockLocale)).toBe('Email is required');
      expect(validateEmail('invalid-email', mockLocale)).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('test@', mockLocale)).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('@domain.com', mockLocale)).toBe(
        'Please provide a valid email'
      );
    });
  });

  describe('validatePhone', () => {
    test('validates correct phone numbers', () => {
      expect(validatePhone('+12345678901', mockLocale)).toBeNull();
      expect(validatePhone('+442071234567', mockLocale)).toBeNull();
      expect(validatePhone('+48123456789', mockLocale)).toBeNull();
    });

    test('rejects invalid phone numbers', () => {
      expect(validatePhone('', mockLocale)).toBe('Phone number is required');
      expect(validatePhone('123', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
      expect(validatePhone('invalid', mockLocale)).toBe(
        'Please provide a valid phone number'
      );
    });

    test('handles phone validation errors gracefully with catch block', () => {
      // Create a scenario that would cause the libphonenumber parsing to throw an error
      // This tests the catch block on line 45

      // Mock parsePhoneNumber to throw an error
      jest.doMock('libphonenumber-js', () => ({
        parsePhoneNumberFromString: jest.fn(() => {
          throw new Error('Parsing failed');
        }),
      }));

      // Re-import the validation function to get the mocked version
      jest.isolateModules(() => {
        const {
          validatePhone: mockedValidatePhone,
        } = require('../formValidation');

        // This should trigger the catch block and return the fallback error message
        expect(mockedValidatePhone('any-value', mockLocale)).toBe(
          'Please provide a valid phone number'
        );
      });

      jest.dontMock('libphonenumber-js');
    });
  });

  describe('validateProjectIdea', () => {
    test('validates project descriptions with sufficient length', () => {
      expect(
        validateProjectIdea(
          'A great project idea with enough details',
          mockLocale
        )
      ).toBeNull();
      expect(
        validateProjectIdea('This is a longer description', mockLocale)
      ).toBeNull();
    });

    test('rejects short project descriptions', () => {
      expect(validateProjectIdea('Short', mockLocale)).toBe(
        'Please provide more details (minimum 12 characters)'
      );
      expect(validateProjectIdea('Test', mockLocale)).toBe(
        'Please provide more details (minimum 12 characters)'
      );
    });

    test('rejects empty project descriptions', () => {
      expect(validateProjectIdea('', mockLocale)).toBe(
        'Project description is required'
      );
      expect(validateProjectIdea(null, mockLocale)).toBe(
        'Project description is required'
      );
    });
  });

  describe('validateConsent', () => {
    test('validates privacy consent', () => {
      expect(validateConsent(true, mockLocale)).toBeNull();
    });

    test('rejects when consent is not given', () => {
      expect(validateConsent(false, mockLocale)).toBe(
        'Privacy consent is required'
      );
      expect(validateConsent(undefined, mockLocale)).toBe(
        'Privacy consent is required'
      );
      expect(validateConsent(null, mockLocale)).toBe(
        'Privacy consent is required'
      );
    });
  });
});
