/**
 * Netlify Function: Send Email via Resend
 */

/**
 * Verify reCAPTCHA token with Google
 */
const verifyRecaptchaToken = async (token) => {
  if (!token) {
    throw new Error('reCAPTCHA token is required');
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.REACT_APP_RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error(`reCAPTCHA verification failed: ${data['error-codes']?.join(', ')}`);
    }

    // Check score if using reCAPTCHA v3
    if (data.score !== undefined && data.score < 0.5) {
      throw new Error('reCAPTCHA score too low - possible bot activity');
    }

    return data;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    throw error;
  }
};

/**
 * Send email via Resend
 */
const sendEmailViaResend = async (templateParams) => {
  const { from_email, phone_number, project_idea, submission_time } = templateParams;

  console.log('Sending email via Resend API:', {
    from: from_email,
    to: process.env.REACT_APP_CONTACT_EMAIL,
    timestamp: submission_time,
  });

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.REACT_APP_CONTACT_EMAIL,
      subject: 'New Portfolio Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${from_email}</p>
        <p><strong>Phone:</strong> ${phone_number}</p>
        <p><strong>Project Idea:</strong></p>
        <p>${project_idea.replace(/\n/g, '<br>')}</p>
        <p><strong>Submitted:</strong> ${submission_time}</p>
      `,
    }),
  });

  console.log('Resend response status:', response.status, response.statusText);

  if (!response.ok) {
    let errorData;
    try {
      const text = await response.text();
      console.log('Resend error response body:', text);
      errorData = JSON.parse(text);
    } catch (e) {
      errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
    }
    throw new Error(
      errorData.message || `Resend API error: ${response.status}`
    );
  }

  const result = await response.json();
  console.log('Resend success response:', result);
  return result;
};

/**
 * Validate and format phone number
 */
const formatPhoneNumber = (phone) => {
  if (!phone) return 'Not provided';
  // Remove special characters, keep only digits
  const cleaned = phone.replace(/\D/g, '');
  return cleaned || phone;
};

/**
 * Main handler for email submission
 */
export const handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse and validate request body
    let formData;
    try {
      formData = JSON.parse(event.body);
    } catch (error) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    const { email, phone, projectIdea, recaptchaToken } = formData;

    // Validate required fields
    if (!email || !projectIdea) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Missing required fields: email and projectIdea',
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Verify reCAPTCHA token if secret key is configured
    if (process.env.REACT_APP_RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'reCAPTCHA token is required' }),
        };
      }

      try {
        await verifyRecaptchaToken(recaptchaToken);
      } catch (error) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: 'reCAPTCHA verification failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
          }),
        };
      }
    }

    // Verify Resend is configured
    if (!process.env.REACT_APP_RESEND_API_KEY) {
      console.warn('Resend not fully configured. API key missing.');

      // In development/demo mode, just log and return success
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        console.log('Demo mode: Form data:', {
          email,
          phone: formatPhoneNumber(phone),
          projectIdea,
          submissionTime: new Date().toLocaleString(),
        });

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            success: true,
            message: 'Email would be sent (demo mode)',
          }),
        };
      }

      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Email service not configured',
        }),
      };
    }

    // Prepare email template parameters
    const templateParams = {
      from_email: email,
      phone_number: formatPhoneNumber(phone),
      project_idea: projectIdea,
      submission_time: new Date().toLocaleString(),
    };

    // Send email via Resend
    const response = await sendEmailViaResend(templateParams);

    console.log('Email sent successfully:', {
      status: 200,
      response: response,
    });

    // Success response
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      apiKeySet: !!process.env.REACT_APP_RESEND_API_KEY,
    });

    const errorMessage = error.message || 'Failed to send email';

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      }),
    };
  }
};

