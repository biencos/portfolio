// Setup jest-dom for custom matchers
import '@testing-library/jest-dom';

// Mock environment variables for tests
process.env.REACT_APP_RECAPTCHA_SITE_KEY = 'test-site-key';

// Mock reCAPTCHA component
jest.mock('react-google-recaptcha', () => {
  const React = require('react');
  const PropTypes = require('prop-types');

  const MockReCAPTCHA = React.forwardRef(({ onChange }, ref) => {
    React.useImperativeHandle(ref, () => ({
      reset: jest.fn(),
      getValue: () => 'test-token',
    }));

    return React.createElement(
      'div',
      {
        'data-testid': 'mock-recaptcha',
        onClick: () => onChange && onChange('test-token'),
      },
      'Mock reCAPTCHA'
    );
  });

  MockReCAPTCHA.propTypes = {
    onChange: PropTypes.func,
  };

  MockReCAPTCHA.displayName = 'ReCAPTCHA';
  return MockReCAPTCHA;
});
