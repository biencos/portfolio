import PropTypes from 'prop-types';
import { useRef, useCallback, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneInput.css';
import useTranslations from '../hooks/useTranslations';

const CustomPhoneInput = ({
  value = '',
  onChange,
  onBlur = () => {},
  onFocus = () => {},
  fieldClass = 'default',
  name = 'phone',
  placeholder,
}) => {
  const t = useTranslations();
  const phoneInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Use locale placeholder if not provided
  const displayPlaceholder = placeholder || t.contact.form.phonePlaceholder;

  // Helper function to get border color value only
  const getBorderColorValue = () => {
    if (isFocused) {
      if (fieldClass === 'error') {
        return '#ff6b6b';
      }
      if (fieldClass === 'typing') {
        return '#1e3a8a';
      }
      return 'rgba(226, 232, 240, 0.2)';
    }

    if (fieldClass === 'error') {
      return '#ff6b6b';
    }
    if (fieldClass === 'valid') {
      return '#22c55e';
    }
    if (fieldClass === 'typing') {
      return '#1e3a8a';
    }
    return 'rgba(189, 224, 254, 0.1)'; // --border-subtle
  };

  // Helper function to get border color with width (for input)
  const getBorderColor = () => {
    return `2px solid ${getBorderColorValue()}`;
  };

  // Helper function to get background color for focus states
  const getBackgroundColor = () => {
    return isFocused ? '#2d3748' : 'rgba(26, 26, 28, 0.8)';
  };

  // Helper function to get box shadow for focus states
  const getBoxShadow = () => {
    if (!isFocused) return 'none';

    if (fieldClass === 'error') {
      return '0 0 0 3px rgba(255, 107, 107, 0.3)';
    }
    if (fieldClass === 'typing') {
      return '0 0 0 3px rgba(30, 58, 138, 0.3)';
    }
    return '0 0 0 3px rgba(160, 174, 192, 0.1)';
  };

  // Helper function to get transform for focus states
  const getTransform = () => {
    return isFocused ? 'translateY(-2px)' : 'translateY(0)';
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

  const handleFocus = useCallback(
    event => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    event => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur]
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
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={displayPlaceholder}
        enableSearch={true}
        autoFormat={true}
        disableCountryCode={false}
        countryCodeEditable={false}
        jumpCursorToEnd={false}
        inputStyle={{
          width: '100%',
          minHeight: '44px',
          height: '57px',
          border: getBorderColor(),
          borderRadius: '0.5rem',
          transition: 'all 0.3s ease',
          outline: 'none',
          color: '#ffffff',
          backgroundColor: getBackgroundColor(),
          fontSize: '1rem',
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: getBoxShadow(),
          transform: getTransform(),
        }}
        buttonStyle={{
          padding: '0 7px',
          backgroundColor: 'transparent',
          border: 'none',
          transition: 'all 0.3s ease',
          transform: getTransform(),
        }}
        dropdownStyle={{
          backgroundColor: 'rgba(26, 26, 28, 0.95)',
          border: '2px solid rgba(189, 224, 254, 0.1)',
          borderRadius: '0.5rem',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          maxWidth: '300px',
        }}
        searchStyle={{
          backgroundColor: 'rgba(26, 26, 28, 0.8)',
          color: '#ffffff',
          border: '2px solid rgba(189, 224, 254, 0.1)',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          fontFamily: "'DM Sans', sans-serif",
          outline: 'none',
          padding: '6px 8px',
          margin: '8px',
          maxWidth: '260px',
          width: 'calc(100% - 16px)',
          boxSizing: 'border-box',
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
  fieldClass: PropTypes.oneOf(['default', 'typing', 'valid', 'error']),
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CustomPhoneInput;
