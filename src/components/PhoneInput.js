import PropTypes from 'prop-types';
import { useRef, useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneInput.css';

const CustomPhoneInput = ({
  value,
  onChange,
  onBlur,
  onFocus,
  fieldClass = '',
  name = 'phone',
}) => {
  const phoneInputRef = useRef(null);

  // Helper function to get border color based on field class
  const getBorderColor = () => {
    if (fieldClass === 'error') {
      return '2px solid #ff6b6b';
    }
    if (fieldClass === 'valid') {
      return '2px solid #22c55e';
    }
    if (fieldClass === 'typing') {
      return '2px solid #1e3a8a';
    }
    return '2px solid rgba(226, 232, 240, 0.2)';
  };

  const handlePhoneChange = useCallback(
    phoneValue => {
      // Ensure the phone value starts with + for proper international validation
      const formattedValue =
        phoneValue && !phoneValue.startsWith('+')
          ? `+${phoneValue}`
          : phoneValue;

      onChange({
        target: {
          name,
          value: formattedValue || '',
        },
      });
    },
    [onChange, name]
  );

  // Simple KISS solution: intercept input events that would affect country code
  const handleInput = useCallback(
    event => {
      const inputElement = event.target;
      const currentValue = inputElement.value;

      // Get the country code (e.g., "+1" for US)
      const countryData = phoneInputRef.current?.state?.selectedCountry;
      const countryCode = countryData ? `+${countryData.dialCode}` : '+1';

      // If the current value doesn't start with the country code, restore it
      if (!currentValue.startsWith(countryCode)) {
        // Extract just the number part after any existing country code
        const numberPart = currentValue.replace(/^\+\d{1,4}\s?/, '');
        const correctedValue = `${countryCode} ${numberPart}`.trim();

        // Update the input value
        inputElement.value = correctedValue;

        // Trigger change with corrected value (remove + for react-phone-input-2)
        const valueForChange = correctedValue.substring(1);
        handlePhoneChange(valueForChange);
      }
    },
    [handlePhoneChange]
  );

  return (
    <div className={`phone-input-wrapper ${fieldClass}`}>
      <PhoneInput
        ref={phoneInputRef}
        country={'us'}
        value={value}
        onChange={handlePhoneChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder='Enter phone number'
        enableSearch={true}
        autoFormat={true}
        disableCountryCode={false}
        countryCodeEditable={false}
        jumpCursorToEnd={false}
        containerStyle={{
          width: '100%',
        }}
        inputStyle={{
          width: '100%',
          height: '48px',
          border: getBorderColor(),
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          outline: 'none',
          color: '#e2e8f0',
          backgroundColor: '#1a202c',
          fontSize: '1rem',
          fontFamily: 'inherit',
        }}
        buttonStyle={{
          width: '50px',
          padding: '0 8px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#e2e8f0',
          transition: 'all 0.3s ease',
        }}
        dropdownStyle={{
          backgroundColor: '#1a202c',
          border: '2px solid #374151',
          color: '#e2e8f0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        searchStyle={{
          backgroundColor: '#374151',
          color: '#e2e8f0',
          borderColor: '#1e3a8a',
          borderWidth: '2px',
          borderRadius: '5px',
          outline: 'none',
        }}
        inputProps={{
          name: name,
          required: true,
          onInput: handleInput,
        }}
      />
    </div>
  );
};

CustomPhoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  fieldClass: PropTypes.string,
  name: PropTypes.string,
};

export default CustomPhoneInput;
