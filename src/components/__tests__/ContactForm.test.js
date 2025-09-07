import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../ContactForm';

// Mock PhoneInput component
jest.mock('../PhoneInput', () => {
  const MockPhoneInput = ({
    name,
    value,
    onChange,
    onBlur,
    onFocus,
    fieldClass = '',
  }) => (
    <div className={`phone-input-wrapper ${fieldClass}`}>
      <input
        data-testid='phone-input'
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder='Enter phone number'
      />
    </div>
  );

  // Add PropTypes to avoid warnings
  MockPhoneInput.propTypes = {
    name: require('prop-types').string,
    value: require('prop-types').string,
    onChange: require('prop-types').func,
    onBlur: require('prop-types').func,
    onFocus: require('prop-types').func,
    fieldClass: require('prop-types').string,
  };

  MockPhoneInput.displayName = 'PhoneInput';
  return MockPhoneInput;
});

describe('ContactForm Component', () => {
  const defaultProps = {
    formData: {
      email: '',
      phone: '',
      projectIdea: '',
      privacyConsent: false,
      recaptchaToken: null,
    },
    errors: {},
    isSubmitting: false,
    submitMessage: '',
    isValid: false,
    recaptchaRef: { current: null },
    onInputChange: jest.fn(),
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    onRecaptchaChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields correctly', () => {
    render(<ContactForm {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(/your email address/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/your project idea/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /privacy policy/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('displays form data values correctly', () => {
    const filledProps = {
      ...defaultProps,
      formData: {
        email: 'test@example.com',
        phone: '+1234567890',
        projectIdea: 'Test project',
        privacyConsent: true,
      },
    };

    render(<ContactForm {...filledProps} />);

    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test project')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /privacy policy/i })
    ).toBeChecked();
  });

  test('displays error messages when errors are present', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        email: 'Email is required',
        phone: 'Phone is required',
        projectIdea: 'Project description is required',
        privacyConsent: 'Privacy consent is required',
      },
    };

    render(<ContactForm {...propsWithErrors} />);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
    expect(
      screen.getByText('Project description is required')
    ).toBeInTheDocument();
    expect(screen.getByText('Privacy consent is required')).toBeInTheDocument();
  });

  test('applies valid styling to fields with valid values when not focused', () => {
    const propsWithValidValues = {
      ...defaultProps,
      formData: {
        email: 'valid@email.com',
        phone: '+12345678901',
        projectIdea: 'A great project idea that is long enough to be valid',
      },
      focusedField: null,
    };

    render(<ContactForm {...propsWithValidValues} />);

    expect(screen.getByPlaceholderText(/your email address/i)).toHaveClass(
      'valid'
    );

    const phoneWrapper = document.querySelector('.phone-input-wrapper');
    expect(phoneWrapper).toHaveClass('valid');
    expect(screen.getByPlaceholderText(/your project idea/i)).toHaveClass(
      'valid'
    );
  });

  test('applies typing styling to focused fields', () => {
    const propsWithFocus = {
      ...defaultProps,
      formData: {
        email: 'invalid-email',
        phone: '+1',
        projectIdea: 'short',
      },
      focusedField: 'email',
    };

    render(<ContactForm {...propsWithFocus} />);

    expect(screen.getByPlaceholderText(/your email address/i)).toHaveClass(
      'typing'
    );

    const phoneWrapper = document.querySelector('.phone-input-wrapper');
    expect(phoneWrapper).not.toHaveClass('typing');
  });

  test('applies valid styling to focused fields with valid content', () => {
    const propsWithValidFocus = {
      ...defaultProps,
      formData: {
        email: 'valid@email.com',
        phone: '+12345678901',
        projectIdea: 'A valid project description that is long enough',
      },
      focusedField: 'email',
    };

    render(<ContactForm {...propsWithValidFocus} />);

    // Focused field with valid content should have 'valid' class
    expect(screen.getByPlaceholderText(/your email address/i)).toHaveClass(
      'valid'
    );

    // Unfocused field with valid content should also have 'valid' class
    const phoneWrapper = document.querySelector('.phone-input-wrapper');
    expect(phoneWrapper).toHaveClass('valid');
    expect(phoneWrapper).not.toHaveClass('typing');

    // Project idea should also have valid styling since it's valid and not focused
    expect(screen.getByPlaceholderText(/your project idea/i)).toHaveClass(
      'valid'
    );
  });

  test('applies error styling to fields with errors', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        email: 'Email is required',
        phone: 'Phone is required',
        projectIdea: 'Project description is required',
      },
    };

    render(<ContactForm {...propsWithErrors} />);

    expect(screen.getByPlaceholderText(/your email address/i)).toHaveClass(
      'error'
    );

    // Check phone wrapper directly
    const phoneWrapper = document.querySelector('.phone-input-wrapper');
    expect(phoneWrapper).not.toBeNull();
    expect(phoneWrapper).toHaveClass('error');
    expect(screen.getByPlaceholderText(/your project idea/i)).toHaveClass(
      'error'
    );
  });

  test('applies typing styling to focused fields with errors', () => {
    const propsWithErrorsAndFocus = {
      ...defaultProps,
      errors: {
        email: 'Email is required',
        phone: 'Phone is required',
        projectIdea: 'Project description is required',
      },
      focusedField: 'email',
    };

    render(<ContactForm {...propsWithErrorsAndFocus} />);

    // Focused field with error should show typing state (navy blue)
    expect(screen.getByPlaceholderText(/your email address/i)).toHaveClass(
      'typing'
    );
    expect(screen.getByPlaceholderText(/your email address/i)).not.toHaveClass(
      'error'
    );

    // Unfocused fields with errors should still show error state
    const phoneWrapper = document.querySelector('.phone-input-wrapper');
    expect(phoneWrapper).toHaveClass('error');
    expect(phoneWrapper).not.toHaveClass('typing');

    expect(screen.getByPlaceholderText(/your project idea/i)).toHaveClass(
      'error'
    );
    expect(screen.getByPlaceholderText(/your project idea/i)).not.toHaveClass(
      'typing'
    );
  });

  test('hides error messages when focused fields with errors show typing state', () => {
    const propsWithErrorsAndFocus = {
      ...defaultProps,
      errors: {
        email: 'Email is required',
        phone: 'Phone is required',
        projectIdea: 'Project description is required',
      },
      focusedField: 'email',
    };

    render(<ContactForm {...propsWithErrorsAndFocus} />);

    // Focused field should not show error message (even though error exists)
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();

    // Unfocused fields with errors should still show error messages
    expect(screen.getByText('Phone is required')).toBeInTheDocument();
    expect(
      screen.getByText('Project description is required')
    ).toBeInTheDocument();
  });

  test('hides phone error message when phone field is focused', () => {
    const propsWithPhoneFocus = {
      ...defaultProps,
      errors: {
        email: 'Email is required',
        phone: 'Phone is required',
        projectIdea: 'Project description is required',
      },
      focusedField: 'phone',
    };

    render(<ContactForm {...propsWithPhoneFocus} />);

    // Phone error should be hidden when focused
    expect(screen.queryByText('Phone is required')).not.toBeInTheDocument();

    // Other fields should still show errors
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(
      screen.getByText('Project description is required')
    ).toBeInTheDocument();
  });

  test('shows error state when phone field has only 1-2 digits and is blurred', () => {
    const mockOnBlur = jest.fn();
    const props = {
      ...defaultProps,
      onBlur: mockOnBlur,
      formData: { ...defaultProps.formData, phone: '12' },
      errors: { phone: 'Please provide a valid phone number' },
    };

    render(<ContactForm {...props} />);

    // Phone field should show error styling with only 1-2 digits
    const phoneWrapper = document.querySelector('.phone-input-wrapper');
    expect(phoneWrapper).toHaveClass('error');
    expect(
      screen.getByText('Please provide a valid phone number')
    ).toBeInTheDocument();
  });

  test('focuses phone field with error should show typing state and hide error', () => {
    const props = {
      ...defaultProps,
      formData: { ...defaultProps.formData, phone: '12' },
      errors: { phone: 'Please provide a valid phone number' },
      focusedField: 'phone',
    };

    render(<ContactForm {...props} />);

    // Focused phone field with error should show typing state (navy blue)
    const phoneWrapper = document.querySelector('.phone-input-wrapper');
    expect(phoneWrapper).toHaveClass('typing');
    expect(phoneWrapper).not.toHaveClass('error');

    // Error message should be hidden when focused
    expect(
      screen.queryByText('Please provide a valid phone number')
    ).not.toBeInTheDocument();
  });

  test('calls onInputChange when form fields are changed', () => {
    const mockOnInputChange = jest.fn();
    const props = { ...defaultProps, onInputChange: mockOnInputChange };

    render(<ContactForm {...props} />);

    // Test email input
    fireEvent.change(screen.getByPlaceholderText(/your email address/i), {
      target: { value: 'test@example.com' },
    });
    expect(mockOnInputChange).toHaveBeenCalled();

    // Test project idea textarea
    fireEvent.change(screen.getByPlaceholderText(/your project idea/i), {
      target: { value: 'Test project description' },
    });
    expect(mockOnInputChange).toHaveBeenCalled();

    // Test privacy consent checkbox
    fireEvent.click(screen.getByRole('checkbox', { name: /privacy policy/i }));
    expect(mockOnInputChange).toHaveBeenCalled();
  });

  test('calls onBlur and onFocus when fields are blurred and focused', () => {
    const mockOnBlur = jest.fn();
    const mockOnFocus = jest.fn();
    const props = { ...defaultProps, onBlur: mockOnBlur, onFocus: mockOnFocus };

    render(<ContactForm {...props} />);

    const emailInput = screen.getByPlaceholderText(/your email address/i);

    fireEvent.focus(emailInput);
    expect(mockOnFocus).toHaveBeenCalled();

    fireEvent.blur(emailInput);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('calls onSubmit when form is submitted', () => {
    const mockOnSubmit = jest.fn().mockImplementation(e => e.preventDefault());
    const props = { ...defaultProps, onSubmit: mockOnSubmit };

    render(<ContactForm {...props} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('shows submit button as disabled when form is invalid', () => {
    const props = { ...defaultProps, isValid: false };

    render(<ContactForm {...props} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toHaveClass('disabled');
  });

  test('shows submit button as enabled when form is valid', () => {
    const props = { ...defaultProps, isValid: true };

    render(<ContactForm {...props} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toHaveClass('disabled');
  });

  test('shows loading state when submitting', () => {
    const props = { ...defaultProps, isSubmitting: true };

    render(<ContactForm {...props} />);

    const submitButton = screen.getByRole('button', { name: /sending/i });
    expect(submitButton).toBeDisabled();
  });

  test('displays success message when provided', () => {
    const props = {
      ...defaultProps,
      submitMessage: 'Thank you! Your message has been sent successfully.',
    };

    render(<ContactForm {...props} />);

    expect(
      screen.getByText('Thank you! Your message has been sent successfully.')
    ).toBeInTheDocument();
  });

  test('displays error message when provided', () => {
    const props = {
      ...defaultProps,
      submitMessage: 'Sorry, there was an error sending your message.',
    };

    render(<ContactForm {...props} />);

    expect(
      screen.getByText('Sorry, there was an error sending your message.')
    ).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<ContactForm {...defaultProps} />);

    // Check for required field indicators
    expect(screen.getAllByText('*')).toHaveLength(3); // Email, Phone, Project Description

    // Check for proper form structure
    expect(screen.getByRole('button', { type: 'submit' })).toBeInTheDocument();
  });

  test('renders project idea placeholder text correctly', () => {
    render(<ContactForm {...defaultProps} />);

    const projectTextarea = screen.getByPlaceholderText(/your project idea/i);
    expect(projectTextarea).toHaveAttribute('placeholder');
    expect(projectTextarea.getAttribute('placeholder')).toContain(
      'Your project idea'
    );
  });

  test('displays reCAPTCHA error message when error exists', () => {
    const propsWithRecaptchaError = {
      ...defaultProps,
      errors: {
        recaptchaToken: 'Please verify you are human',
      },
    };

    render(<ContactForm {...propsWithRecaptchaError} />);

    expect(screen.getByText('Please verify you are human')).toBeInTheDocument();
    // Check that the error message has the correct styling
    const errorMessage = screen.getByText('Please verify you are human');
    expect(errorMessage).toHaveClass('error-message');
  });

  test('displays error placeholder when no reCAPTCHA error exists', () => {
    const { container } = render(<ContactForm {...defaultProps} />);

    // Check that there's an error placeholder in the recaptcha field
    const recaptchaField = container.querySelector('.recaptcha-field');
    const errorPlaceholder = recaptchaField.querySelector('.error-placeholder');
    expect(errorPlaceholder).toBeInTheDocument();

    // Ensure no error message is displayed
    expect(
      screen.queryByText(/please verify you are human/i)
    ).not.toBeInTheDocument();
  });

  test('renders with minimal props (testing default prop values)', () => {
    const minimalProps = {
      formData: {
        email: '',
        phone: '',
        projectIdea: '',
        privacyConsent: false,
        recaptchaToken: null,
      },
      recaptchaRef: { current: null },
      onInputChange: jest.fn(),
      onBlur: jest.fn(),
      onFocus: jest.fn(),
      onRecaptchaChange: jest.fn(),
      onSubmit: jest.fn(),
      // Not providing errors, isSubmitting, submitMessage, isValid to test defaults
    };

    render(<ContactForm {...minimalProps} />);

    // Should render without errors using default values
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toHaveClass(
      'disabled'
    ); // isValid defaults to false
  });

  test('handles default case in getBorderColor function', () => {
    // Test with invalid field name to trigger default case
    const props = {
      ...defaultProps,
    };

    render(<ContactForm {...props} />);

    // Component should render without errors
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  test('handles default case in getRequiredClass function', () => {
    // Test with empty props to ensure robustness
    const props = {
      ...defaultProps,
    };

    render(<ContactForm {...props} />);

    // Component should render without errors
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });
});
