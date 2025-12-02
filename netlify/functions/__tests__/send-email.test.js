/**
 * Tests for send-email Netlify Function
 * 
 * Note: These tests are designed to run separately from the main test suite.
 * Jest in Create React App only runs tests in src/
 */

// Mock fetch globally
global.fetch = jest.fn();

// Import handler after mocking fetch
const { handler } = require('../send-email.js');

describe('send-email Netlify Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    delete process.env.REACT_APP_RESEND_API_KEY;
    delete process.env.REACT_APP_RECAPTCHA_SECRET_KEY;
    delete process.env.REACT_APP_CONTACT_EMAIL;
    process.env.NODE_ENV = 'test';
  });

  describe('HTTP Method Validation', () => {
    it('should reject non-POST requests with 405 status', async () => {
      const event = {
        httpMethod: 'GET',
        body: '{}',
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(405);
      expect(JSON.parse(response.body)).toEqual({
        error: 'Method not allowed',
      });
    });

    it('should accept POST requests', async () => {
      process.env.NODE_ENV = 'test';
      process.env.REACT_APP_RESEND_API_KEY = 'test-key';

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
          recaptchaToken: 'test-token',
        }),
      };

      const response = await handler(event);

      // In test mode with API key set, should attempt to send
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Request Body Validation', () => {
    it('should reject invalid JSON', async () => {
      const event = {
        httpMethod: 'POST',
        body: 'invalid json {',
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body)).toEqual({
        error: 'Invalid JSON in request body',
      });
    });

    it('should reject missing email field', async () => {
      process.env.NODE_ENV = 'test';

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          phone: '1234567890',
          projectIdea: 'Test project',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.error).toContain('Missing required fields');
    });

    it('should reject missing projectIdea field', async () => {
      process.env.NODE_ENV = 'test';

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.error).toContain('Missing required fields');
    });

    it('should reject invalid email format', async () => {
      process.env.NODE_ENV = 'test';

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'invalid-email',
          phone: '1234567890',
          projectIdea: 'Test project',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body)).toEqual({
        error: 'Invalid email format',
      });
    });
  });

  describe('reCAPTCHA Verification', () => {
    it('should reject missing reCAPTCHA token when secret is configured', async () => {
      process.env.REACT_APP_RECAPTCHA_SECRET_KEY = 'test-secret';

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
          recaptchaToken: null,
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body)).toEqual({
        error: 'reCAPTCHA token is required',
      });
    });

    it('should skip reCAPTCHA verification when secret key is not configured', async () => {
      process.env.NODE_ENV = 'test';
      process.env.REACT_APP_RESEND_API_KEY = 'test-key';
      // REACT_APP_RECAPTCHA_SECRET_KEY is not set

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
          // no recaptchaToken
        }),
      };

      const response = await handler(event);

      // Should proceed without reCAPTCHA error
      expect(response.statusCode).toBe(200);
    });

    it('should handle reCAPTCHA verification failure', async () => {
      process.env.REACT_APP_RECAPTCHA_SECRET_KEY = 'test-secret';

      // Mock failed reCAPTCHA response
      global.fetch.mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            success: false,
            'error-codes': ['invalid-token'],
          }),
      });

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
          recaptchaToken: 'invalid-token',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body)).toEqual({
        error: 'reCAPTCHA verification failed',
      });
    });
  });

  describe('Demo Mode (Development)', () => {
    it('should return success in demo mode when API key is missing', async () => {
      process.env.NODE_ENV = 'development';
      // REACT_APP_RESEND_API_KEY is not set

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.message).toContain('demo mode');
    });

    it('should return success in test mode when API key is missing', async () => {
      process.env.NODE_ENV = 'test';
      // REACT_APP_RESEND_API_KEY is not set

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.message).toContain('demo mode');
    });

    it('should return error in production mode when API key is missing', async () => {
      process.env.NODE_ENV = 'production';
      // REACT_APP_RESEND_API_KEY is not set

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.body)).toEqual({
        error: 'Email service not configured',
      });
    });
  });

  describe('Resend API Integration', () => {
    it('should handle successful email sending', async () => {
      process.env.NODE_ENV = 'production';
      process.env.REACT_APP_RESEND_API_KEY = 're_test_key';
      process.env.REACT_APP_CONTACT_EMAIL = 'contact@example.com';
      process.env.REACT_APP_RECAPTCHA_SECRET_KEY = 'test-secret';

      // Mock reCAPTCHA verification
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true }),
      });

      // Mock Resend API success
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 'email_123' }),
      });

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
          recaptchaToken: 'valid-token',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(true);
      expect(body.message).toContain('successfully');
    });

    it('should handle Resend API errors', async () => {
      process.env.NODE_ENV = 'production';
      process.env.REACT_APP_RESEND_API_KEY = 're_test_key';
      process.env.REACT_APP_CONTACT_EMAIL = 'contact@example.com';
      process.env.REACT_APP_RECAPTCHA_SECRET_KEY = 'test-secret';

      // Mock reCAPTCHA verification
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ success: true }),
      });

      // Mock Resend API error
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Invalid email'),
      });

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
          recaptchaToken: 'valid-token',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Failed to send email');
    });

    it('should include development error details in test mode', async () => {
      process.env.NODE_ENV = 'development';
      process.env.REACT_APP_RESEND_API_KEY = 're_test_key';
      process.env.REACT_APP_CONTACT_EMAIL = 'contact@example.com';

      // Mock Resend API error
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Invalid recipient'),
      });

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '1234567890',
          projectIdea: 'Test project',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(500);
      const body = JSON.parse(response.body);
      expect(body.details).toBeDefined(); // Should include error details in development
    });
  });

  describe('Phone Number Formatting', () => {
    it('should handle missing phone number', async () => {
      process.env.NODE_ENV = 'test';
      process.env.REACT_APP_RESEND_API_KEY = 'test-key';

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          projectIdea: 'Test project',
          // no phone
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(200);
    });

    it('should format phone numbers correctly', async () => {
      process.env.NODE_ENV = 'production';
      process.env.REACT_APP_RESEND_API_KEY = 're_test_key';
      process.env.REACT_APP_CONTACT_EMAIL = 'contact@example.com';

      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 'email_123' }),
      });

      const event = {
        httpMethod: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '(123) 456-7890',
          projectIdea: 'Test project',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(200);
      // Verify fetch was called with formatted phone
      expect(global.fetch).toHaveBeenCalled();
      const fetchCall = global.fetch.mock.calls.find(
        call => call[0] === 'https://api.resend.com/emails'
      );
      const requestBody = JSON.parse(fetchCall[1].body);
      expect(requestBody.template_params.phone_number).toBe('1234567890');
    });
  });

  describe('Content Type Headers', () => {
    it('should include Content-Type: application/json in responses', async () => {
      const event = {
        httpMethod: 'GET',
        body: '{}',
      };

      const response = await handler(event);

      expect(response.headers['Content-Type']).toBe('application/json');
    });
  });
});
