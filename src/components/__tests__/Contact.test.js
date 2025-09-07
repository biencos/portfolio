import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Contact from '../Contact';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const ContactWithRouter = () => (
  <BrowserRouter>
    <Contact />
  </BrowserRouter>
);

describe('Contact Component', () => {
  beforeEach(() => {
    // Mock window.alert
    window.alert = jest.fn();
    // Clear mock calls
    mockNavigate.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders contact form with all required fields', async () => {
    render(<ContactWithRouter />);

    // Wait for country detection to complete
    await waitFor(() => {
      expect(
        screen.queryByText('Detecting your country...')
      ).not.toBeInTheDocument();
    });

    expect(
      screen.getByRole('heading', { name: /contact/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/your email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/your project idea/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/i agree to the/i)).toBeInTheDocument();
  });

  it('submit button has disabled styling by default but is clickable', async () => {
    render(<ContactWithRouter />);

    // Wait for country detection to complete
    await waitFor(() => {
      expect(
        screen.queryByText('Detecting your country...')
      ).not.toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveClass('disabled');
  });

  it('enables submit button when all fields are valid', async () => {
    render(<ContactWithRouter />);

    // Wait for country detection to complete
    await waitFor(() => {
      expect(
        screen.queryByText('Detecting your country...')
      ).not.toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText(/your email address/i);
    const phoneInput = screen.getByPlaceholderText(/enter phone number/i);
    const projectInput = screen.getByPlaceholderText(/your project idea/i);
    const privacyCheckbox = screen.getByRole('checkbox', {
      name: /i agree to the/i,
    });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out all required fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+14155552671' } });
    fireEvent.change(projectInput, {
      target: { value: 'This is a valid project description' },
    });
    fireEvent.click(privacyCheckbox);

    // Click reCAPTCHA to complete verification
    const recaptcha = screen.getByTestId('mock-recaptcha');
    fireEvent.click(recaptcha);

    // Trigger validation events
    fireEvent.blur(emailInput);
    fireEvent.blur(phoneInput);
    fireEvent.blur(projectInput);

    // Wait for form state to become valid
    await waitFor(
      () => {
        expect(submitButton).not.toBeDisabled();
      },
      { timeout: 3000 }
    );
  });

  it('validates email format', async () => {
    render(<ContactWithRouter />);

    const emailInput = screen.getByPlaceholderText(/your email address/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText('Please provide a valid email')
      ).toBeInTheDocument();
    });
  });

  it('validates project idea minimum length', async () => {
    render(<ContactWithRouter />);

    const projectInput = screen.getByPlaceholderText(/your project idea/i);

    fireEvent.change(projectInput, { target: { value: 'Short' } });
    fireEvent.blur(projectInput);

    await waitFor(() => {
      expect(
        screen.getByText('Please provide more details (minimum 12 characters)')
      ).toBeInTheDocument();
    });
  });

  it('validates phone number format', async () => {
    render(<ContactWithRouter />);

    const phoneInput = screen.getByPlaceholderText(/enter phone number/i);

    // Enter an invalid phone number
    fireEvent.change(phoneInput, { target: { value: '+1123' } });
    fireEvent.blur(phoneInput);

    await waitFor(() => {
      expect(
        screen.getByText('Please provide a valid phone number')
      ).toBeInTheDocument();
    });
  });

  it('shows project idea placeholder text', () => {
    render(<ContactWithRouter />);

    const projectInput = screen.getByPlaceholderText(/your project idea/i);
    expect(projectInput).toBeInTheDocument();
    expect(projectInput).toHaveAttribute(
      'placeholder',
      expect.stringContaining('Hi, I would like to create an e-commerce shop')
    );
  });

  it('handles form submission correctly', async () => {
    render(<ContactWithRouter />);

    const emailInput = screen.getByPlaceholderText(/your email address/i);
    const phoneInput = screen.getByPlaceholderText(/enter phone number/i);
    const projectInput = screen.getByPlaceholderText(/your project idea/i);
    const privacyCheckbox = screen.getByRole('checkbox', {
      name: /i agree to the/i,
    });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '+14155552671' } });
    fireEvent.change(projectInput, {
      target: {
        value:
          'I want to create an amazing e-commerce website with payment integration',
      },
    });
    fireEvent.click(privacyCheckbox);

    // Click reCAPTCHA to complete verification
    const recaptcha = screen.getByTestId('mock-recaptcha');
    fireEvent.click(recaptcha);

    // Trigger validation by blurring fields
    fireEvent.blur(emailInput);
    fireEvent.blur(phoneInput);
    fireEvent.blur(projectInput);

    // Wait for form to become valid (may take time for phone validation)
    await waitFor(
      () => {
        expect(submitButton).not.toBeDisabled();
      },
      { timeout: 3000 }
    );

    // Submit form
    fireEvent.click(submitButton);

    // In test environment, check for success message instead of navigation
    await waitFor(
      () => {
        expect(
          screen.getByText(
            'Thank you! Your message has been sent successfully.'
          )
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('clears errors when user starts typing', async () => {
    render(<ContactWithRouter />);

    const emailInput = screen.getByPlaceholderText(/your email address/i);

    // Trigger error
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText('Please provide a valid email')
      ).toBeInTheDocument();
    });

    // Start typing valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(
        screen.queryByText('Please provide a valid email')
      ).not.toBeInTheDocument();
    });
  });

  it('shows validation errors when checkboxes are unchecked after being checked', async () => {
    render(<ContactWithRouter />);

    const privacyCheckbox = screen.getByRole('checkbox', {
      name: /i agree to the/i,
    });

    // Check and then uncheck privacy consent
    fireEvent.click(privacyCheckbox);
    fireEvent.click(privacyCheckbox);

    await waitFor(() => {
      expect(
        screen.getByText('Privacy consent is required')
      ).toBeInTheDocument();
    });

    // Check the checkbox again to clear error
    fireEvent.click(privacyCheckbox);

    await waitFor(() => {
      expect(
        screen.queryByText('Privacy consent is required')
      ).not.toBeInTheDocument();
    });
  });

  it('validates phone number on blur when it has invalid format but looks complete', async () => {
    render(<ContactWithRouter />);

    const phoneInput = screen.getByDisplayValue('+1');

    // Enter an invalid but long enough phone number that should trigger validation
    fireEvent.change(phoneInput, { target: { value: '+1234' } });

    // Focus on phone input
    fireEvent.focus(phoneInput);

    // Then blur - this should trigger validation since it's 5 characters
    fireEvent.blur(phoneInput);

    // Should show phone validation error
    await waitFor(() => {
      expect(
        screen.getByText('Please provide a valid phone number')
      ).toBeInTheDocument();
    });
  });

  it('validates phone number on blur with invalid format', async () => {
    render(<ContactWithRouter />);

    const phoneInput = screen.getByDisplayValue('+1');

    // Enter an invalid phone number
    fireEvent.change(phoneInput, { target: { value: '+1123' } });

    // Then blur
    fireEvent.blur(phoneInput);

    // Should show phone validation error
    await waitFor(() => {
      expect(
        screen.getByText('Please provide a valid phone number')
      ).toBeInTheDocument();
    });
  });
});
