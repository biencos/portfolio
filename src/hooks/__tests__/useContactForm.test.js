import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useContactForm from '../useContactForm';
import emailjs from '@emailjs/browser';
import { getLocale } from '../../utils/testUtils';

const locale = getLocale();

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
}));

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock environment variables
const originalEnv = process.env;

const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

describe('useContactForm Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    // Set up test environment variables
    process.env = {
      ...originalEnv,
      REACT_APP_EMAILJS_SERVICE_ID: 'test_service',
      REACT_APP_EMAILJS_TEMPLATE_ID: 'test_template',
      REACT_APP_EMAILJS_PUBLIC_KEY: 'test_key',
      NODE_ENV: 'development',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  test('initializes with default form data', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    expect(result.current.formData).toEqual({
      email: '',
      phone: '',
      projectIdea: '',
      privacyConsent: false,
      recaptchaToken: null,
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitMessage).toBe('');
  });

  test('handles input changes correctly', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
    });

    expect(result.current.formData.email).toBe('test@example.com');
  });

  test('handles checkbox changes correctly', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleInputChange({
        target: {
          name: 'privacyConsent',
          checked: true,
          type: 'checkbox',
        },
      });
    });

    expect(result.current.formData.privacyConsent).toBe(true);
  });

  test('shows error immediately when privacy checkbox is unchecked', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleInputChange({
        target: {
          name: 'privacyConsent',
          checked: false,
          type: 'checkbox',
        },
      });
    });

    expect(result.current.errors.privacyConsent).toBe(
      locale.contact.form.validation.privacyRequired
    );
  });

  test('handles focus events', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleInputFocus({
        target: { name: 'email' },
      });
    });

    expect(result.current.focusedField).toBe('email');
  });

  test('handles blur events', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Focus first
    act(() => {
      result.current.handleInputFocus({
        target: { name: 'email' },
      });
    });

    // Then blur
    act(() => {
      result.current.handleInputBlur({
        target: { name: 'email' },
      });
    });

    expect(result.current.focusedField).toBeNull();
  });

  test('handles reCAPTCHA changes correctly', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    expect(result.current.formData.recaptchaToken).toBe('test-token');
  });

  test('validates form on submission with valid data', async () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Set valid form data
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'phone', value: '+14155552671', type: 'tel' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'A great project idea that is long enough',
          type: 'textarea',
        },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(mockNavigate).toHaveBeenCalledWith('/thank-you');
  });

  test('validates form on submission with invalid data', async () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.errors).toHaveProperty('email');
    expect(result.current.errors).toHaveProperty('phone');
    expect(result.current.errors).toHaveProperty('projectIdea');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('handles validation click when form is invalid', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    act(() => {
      result.current.handleValidationClick({ preventDefault: jest.fn() });
    });

    expect(result.current.errors).toHaveProperty('email');
    expect(result.current.errors).toHaveProperty('phone');
    expect(result.current.errors).toHaveProperty('projectIdea');
  });

  // EmailJS Integration Tests
  test('sends email successfully with EmailJS configured', async () => {
    emailjs.send.mockResolvedValueOnce({ status: 200 });
    process.env.NODE_ENV = 'test';

    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Fill form with valid data
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
      result.current.handleInputChange({
        target: { name: 'phone', value: '+1 234 567 8901', type: 'tel' },
      });
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'Test project description with enough details',
          type: 'textarea',
        },
      });
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    // Set reCAPTCHA token
    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(emailjs.send).toHaveBeenCalledWith(
      'test_service',
      'test_template',
      expect.objectContaining({
        from_email: 'test@example.com',
        phone_number: '+1 234 567 8901',
        project_idea: 'Test project description with enough details',
        submission_time: expect.any(String),
      }),
      'test_key'
    );

    expect(result.current.submitMessage).toBe(
      'Thank you! Your message has been sent successfully.'
    );
    expect(mockNavigate).not.toHaveBeenCalled();

    delete process.env.NODE_ENV;
  });

  test('falls back to development mode when EmailJS not configured', async () => {
    // Remove EmailJS configuration and set test environment
    process.env.REACT_APP_EMAILJS_SERVICE_ID = '';
    process.env.NODE_ENV = 'test';

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Fill form with valid data
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
      result.current.handleInputChange({
        target: { name: 'phone', value: '+1 234 567 8901', type: 'tel' },
      });
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'Test project description with enough details',
          type: 'textarea',
        },
      });
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    // Set reCAPTCHA token
    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(emailjs.send).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'EmailJS not configured. Form data:',
      expect.any(Object)
    );
    expect(result.current.submitMessage).toBe(
      'Thank you! Your message has been sent successfully.'
    );

    consoleSpy.mockRestore();
    delete process.env.NODE_ENV;
  });

  test('handles EmailJS send failure gracefully', async () => {
    emailjs.send.mockRejectedValueOnce(new Error('Network error'));
    process.env.NODE_ENV = 'development';

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Fill form with valid data
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
      result.current.handleInputChange({
        target: { name: 'phone', value: '+1 234 567 8901', type: 'tel' },
      });
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'Test project description with enough details',
          type: 'textarea',
        },
      });
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    // Set reCAPTCHA token
    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Email send failed:',
      expect.any(Error)
    );
    expect(result.current.submitMessage).toBe(
      locale.contact.form.messages.errorSubmit
    );

    consoleErrorSpy.mockRestore();
    delete process.env.NODE_ENV;
  });

  test('includes formatted phone number in template parameters', async () => {
    emailjs.send.mockResolvedValueOnce({ status: 200 });
    process.env.NODE_ENV = 'test';

    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Fill form with formatted phone number
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
      result.current.handleInputChange({
        target: { name: 'phone', value: '+1 (234) 567-8901', type: 'tel' },
      });
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'Test project description with enough details',
          type: 'textarea',
        },
      });
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    // Set reCAPTCHA token
    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(emailjs.send).toHaveBeenCalledWith(
      'test_service',
      'test_template',
      expect.objectContaining({
        phone_number: '+1 234 567 8901', // formatInternational() format
      }),
      'test_key'
    );

    delete process.env.NODE_ENV;
  });

  test('clears reCAPTCHA error when token is received', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    // First set a reCAPTCHA error
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    // Verify error exists (it should be set because no reCAPTCHA token)
    expect(result.current.errors.recaptchaToken).toBeTruthy();

    // Now provide a reCAPTCHA token, which should clear the error
    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    expect(result.current.errors.recaptchaToken).toBeNull();
  });

  test('validates short phone numbers on blur', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Set a very short phone number
    act(() => {
      result.current.handleInputChange({
        target: { name: 'phone', value: '123', type: 'tel' },
      });
    });

    // Blur should now validate even short numbers
    act(() => {
      result.current.handleInputBlur({ target: { name: 'phone' } });
    });

    // Should have phone error for invalid short numbers
    expect(result.current.errors.phone).toBe(
      'Please provide a valid phone number'
    );
  });

  test('handles phone parsing fallback when libphonenumber parsing fails', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Set phone data that might cause parsing issues
    act(() => {
      result.current.handleInputChange({
        target: { name: 'phone', value: 'invalid-phone-format', type: 'tel' },
      });
    });

    // Fill other required fields
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'Test project',
          type: 'textarea',
        },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    // Submit should handle parsing fallback gracefully
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    // Should still work with fallback to original value
    expect(result.current.isSubmitting).toBe(false);
  });

  test('handles phone number parsing error and uses fallback value', () => {
    // Mock parsePhoneNumberFromString to throw an error
    const originalLib = require('libphonenumber-js');
    const mockParsePhoneNumberFromString = jest.fn(() => {
      throw new Error('Parsing failed');
    });

    jest.doMock('libphonenumber-js', () => ({
      ...originalLib,
      parsePhoneNumberFromString: mockParsePhoneNumberFromString,
    }));

    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Set up complete form data
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'phone', value: '+1234567890', type: 'tel' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'Test project',
          type: 'textarea',
        },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    // Submit the form - this should trigger the catch block
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    // Should handle the error gracefully and use fallback
    expect(result.current.isSubmitting).toBe(false);
  });

  test('uses fallback phone value when parsing throws error', () => {
    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Fill form with invalid phone that will cause parsing to fail
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'phone', value: 'definitely-not-a-phone', type: 'tel' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'Test project',
          type: 'textarea',
        },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    // This should execute the catch block with fallback
    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  test('resets reCAPTCHA widget after successful form submission', async () => {
    const mockReset = jest.fn();
    const { result } = renderHook(() => useContactForm(), { wrapper });

    // Mock the reCAPTCHA ref
    result.current.recaptchaRef.current = { reset: mockReset };

    // Fill form data
    act(() => {
      result.current.handleInputChange({
        target: { name: 'email', value: 'test@example.com', type: 'email' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'phone', value: '+12345678901', type: 'tel' },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: {
          name: 'projectIdea',
          value: 'Test project',
          type: 'textarea',
        },
      });
    });

    act(() => {
      result.current.handleInputChange({
        target: { name: 'privacyConsent', checked: true, type: 'checkbox' },
      });
    });

    act(() => {
      result.current.handleRecaptchaChange('test-token');
    });

    // Mock successful EmailJS response
    emailjs.send.mockResolvedValueOnce({ status: 200 });

    // Submit form
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    // Verify reCAPTCHA was reset
    expect(mockReset).toHaveBeenCalled();
  });
});
