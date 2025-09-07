import {
  validateEmail,
  validatePhone,
  validateProjectIdea,
  validateConsent,
} from '../formValidation';

describe('formValidation', () => {
  describe('validateEmail', () => {
    test('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user@domain.org')).toBeNull();
      expect(validateEmail('name.surname@company.co.uk')).toBeNull();
    });

    test('rejects invalid email addresses', () => {
      expect(validateEmail('')).toBe('Email is required');
      expect(validateEmail('invalid-email')).toBe(
        'Please provide a valid email'
      );
      expect(validateEmail('test@')).toBe('Please provide a valid email');
      expect(validateEmail('@domain.com')).toBe('Please provide a valid email');
    });
  });

  describe('validatePhone', () => {
    test('validates correct phone numbers', () => {
      expect(validatePhone('+12345678901')).toBeNull();
      expect(validatePhone('+442071234567')).toBeNull();
      expect(validatePhone('+48123456789')).toBeNull();
    });

    test('rejects invalid phone numbers', () => {
      expect(validatePhone('')).toBe('Phone number is required');
      expect(validatePhone('123')).toBe('Please provide a valid phone number');
      expect(validatePhone('invalid')).toBe(
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
        expect(mockedValidatePhone('any-value')).toBe(
          'Please provide a valid phone number'
        );
      });

      jest.dontMock('libphonenumber-js');
    });
  });

  describe('validateProjectIdea', () => {
    test('validates project descriptions with sufficient length', () => {
      expect(
        validateProjectIdea('A great project idea with enough details')
      ).toBeNull();
      expect(validateProjectIdea('This is a longer description')).toBeNull();
    });

    test('rejects short project descriptions', () => {
      expect(validateProjectIdea('Short')).toBe(
        'Please provide more details (minimum 12 characters)'
      );
      expect(validateProjectIdea('Test')).toBe(
        'Please provide more details (minimum 12 characters)'
      );
    });

    test('rejects empty project descriptions', () => {
      expect(validateProjectIdea('')).toBe('Project description is required');
      expect(validateProjectIdea(null)).toBe('Project description is required');
    });
  });

  describe('validateConsent', () => {
    test('validates privacy consent', () => {
      expect(validateConsent(true)).toBeNull();
      expect(validateConsent(true, 'Privacy')).toBeNull();
    });

    test('rejects when consent is not given', () => {
      expect(validateConsent(false)).toBe('consent is required');
      expect(validateConsent(false, 'Privacy consent')).toBe(
        'Privacy consent is required'
      );
      expect(validateConsent(undefined)).toBe('consent is required');
      expect(validateConsent(null)).toBe('consent is required');
    });
  });
});
