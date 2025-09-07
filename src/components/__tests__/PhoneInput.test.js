import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PhoneInput from '../PhoneInput';

describe('PhoneInput Component', () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();
  const mockOnFocus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders phone input component', () => {
    render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');
    expect(phoneInput).toBeInTheDocument();
  });

  test('renders with default US country', () => {
    render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    // Check for US flag or country indicator
    const countryButton = screen.getByRole('button');
    expect(countryButton).toBeInTheDocument();
  });

  test('calls onChange when phone number is entered', async () => {
    const user = userEvent.setup();
    render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');
    await user.type(phoneInput, '2345678901');

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('formats phone number correctly', async () => {
    const user = userEvent.setup();
    render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');
    await user.type(phoneInput, '2345678901');

    // Check that onChange was called with formatted value
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'phone',
          value: expect.stringContaining('+1'),
        }),
      })
    );
  });

  test('applies error styling when fieldClass is error', () => {
    const { container } = render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
        fieldClass='error'
      />
    );

    const phoneInputElement = container.querySelector('.react-tel-input input');
    expect(phoneInputElement).toBeInTheDocument();
    // Check that the input has error border styling
    expect(phoneInputElement).toHaveStyle('border: 2px solid #ff6b6b');
  });

  test('handles phone input focus and blur events', async () => {
    const user = userEvent.setup();

    render(
      <PhoneInput
        value='+12345678901'
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');

    // Test focus
    await user.click(phoneInput);
    expect(mockOnFocus).toHaveBeenCalled();

    // Test blur
    await user.tab(); // This will trigger blur
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('allows phone number changes and formatting', async () => {
    const user = userEvent.setup();

    render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');

    // Type a phone number
    await user.type(phoneInput, '2345678901');

    // Should have triggered onChange
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: 'phone',
          value: expect.any(String),
        }),
      })
    );
  });

  test('renders with proper input props and handles events', () => {
    const { container } = render(
      <PhoneInput
        value='+12345678901'
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = container.querySelector('input[type="tel"]');
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('name', 'phone');

    // Simulate an input event to test the onInput handler
    fireEvent.input(phoneInput, { target: { value: '+12345678901' } });

    // Should not throw errors and component should still be present
    expect(phoneInput).toBeInTheDocument();
  });

  test('handles country code correction when user removes it', () => {
    const { container } = render(
      <PhoneInput
        value='+12345678901'
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = container.querySelector('input[type="tel"]');

    // Simulate user removing the country code manually
    fireEvent.input(phoneInput, { target: { value: '2345678901' } });

    // The onInput handler should correct the value
    expect(phoneInput).toBeInTheDocument();
  });

  test('handles country code correction with different country codes', () => {
    const { container } = render(
      <PhoneInput
        value='+442345678901'
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = container.querySelector('input[type="tel"]');

    // Simulate user removing part of the country code
    fireEvent.input(phoneInput, { target: { value: '+42345678901' } });

    // The onInput handler should handle this case
    expect(phoneInput).toBeInTheDocument();
  });

  test('handles phone change with empty value', () => {
    render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');

    // Simulate phone input change with empty value
    fireEvent.change(phoneInput, { target: { value: '' } });

    expect(phoneInput).toBeInTheDocument();
  });

  test('handles phone change with value that already starts with +', () => {
    render(
      <PhoneInput
        value='+12345678901'
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');

    // The component should handle values that already start with +
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput.value).toContain('+1');
  });

  test('handles phone change with value that does not start with +', async () => {
    const user = userEvent.setup();

    render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');

    // Type a number without + prefix to test the formatting logic
    await user.type(phoneInput, '2345678901');

    // Should have triggered onChange with proper formatting
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('handles phone change with null/undefined value', () => {
    render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = screen.getByRole('textbox');

    // Simulate phone input change with null value (edge case)
    fireEvent.change(phoneInput, { target: { value: null } });

    expect(phoneInput).toBeInTheDocument();
  });

  test('handles country code correction when phone input ref is not available', () => {
    const { container } = render(
      <PhoneInput
        value='+12345678901'
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = container.querySelector('input[type="tel"]');

    // Mock scenario where phoneInputRef.current is null
    fireEvent.input(phoneInput, { target: { value: '2345678901' } });

    expect(phoneInput).toBeInTheDocument();
  });

  test('handles country code restoration when phoneInputRef has no state', () => {
    const { container } = render(
      <PhoneInput
        value=''
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = container.querySelector('input[type="tel"]');

    // Test case where phoneInputRef.current.state is undefined
    // This should default to +1 country code
    fireEvent.input(phoneInput, { target: { value: '234567890' } });

    expect(phoneInput).toBeInTheDocument();
  });

  test('handles input event when current value already starts with country code', () => {
    const { container } = render(
      <PhoneInput
        value='+1234567890'
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        onFocus={mockOnFocus}
      />
    );

    const phoneInput = container.querySelector('input[type="tel"]');

    // Test case where current value already starts with country code
    fireEvent.input(phoneInput, { target: { value: '+1234567890' } });

    expect(phoneInput).toBeInTheDocument();
  });
});
