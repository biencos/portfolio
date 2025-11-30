// Setup jest-dom for custom matchers
import '@testing-library/jest-dom';

// Mock IntersectionObserver for tests
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe() {
    // Mock implementation - do nothing
  }

  unobserve() {
    // Mock implementation - do nothing
  }

  disconnect() {
    // Mock implementation - do nothing
  }
};

// Mock environment variables for tests
process.env.REACT_APP_RECAPTCHA_SITE_KEY = 'test-site-key';
process.env.REACT_APP_EMAILJS_SERVICE_ID = 'test-service-id';
process.env.REACT_APP_EMAILJS_TEMPLATE_ID = 'test-template-id';
process.env.REACT_APP_EMAILJS_PUBLIC_KEY = 'test-public-key';

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver for responsive tests
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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

// Mock EmailJS library
jest.mock('@emailjs/browser', () => ({
  send: jest.fn().mockResolvedValue({ status: 200 }),
}));
