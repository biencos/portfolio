import { Helmet } from 'react-helmet';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => (
  <div className='legal-page'>
    <Helmet>
      <title>Privacy Policy - Portfolio</title>
      <meta property='og:title' content='Privacy Policy - Portfolio' />
      <meta
        name='description'
        content='Privacy Policy for our portfolio website and contact services.'
      />
    </Helmet>

    <div className='legal-content'>
      <h1>Privacy Policy</h1>
      <p className='last-updated'>Effective Date: august 20, 2025</p>

      <section>
        <h2>Introduction</h2>
        <p>
          We (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) value your
          privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our portfolio website and
          interact with our services.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>
          When you contact us through our contact form or other communication
          methods, we may collect your email address, phone number (optional),
          and your project idea or inquiry description.
        </p>
        <h3>Automatically Collected Data</h3>
        <p>
          We may also collect your IP address and technical data to help secure
          and maintain the website.
        </p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>
            Respond to your inquiries and provide the requested information or
            services
          </li>
          <li>Communicate with you regarding your requests</li>
          <li>Maintain and improve our website security and functionality</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>Legal Bases for Processing (EU GDPR)</h2>
        <p>
          If you are located in the European Economic Area (EEA), our legal
          basis for collecting and using your personal information depends on
          the information concerned and the specific context, including:
        </p>
        <ul>
          <li>Your consent</li>
          <li>
            Our legitimate interests, such as responding to inquiries and
            maintaining site security
          </li>
          <li>Compliance with a legal obligation</li>
        </ul>
      </section>

      <section>
        <h2>Data Sharing and Disclosure</h2>
        <p>
          We do not sell, rent, or lease your personal information to third
          parties. We may share your data only with trusted service providers
          who assist us in operating our website and services (such as email
          providers). These providers are obligated to keep your information
          confidential.
        </p>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>
          We implement reasonable administrative, technical, and physical
          measures designed to protect your personal data from unauthorized
          access, disclosure, alteration, or destruction. However, no internet
          transmission or electronic storage method is completely secure.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have the following rights
          regarding your personal data:
        </p>
        <ul>
          <li>Access to the data we hold about you</li>
          <li>Correction of inaccurate personal data</li>
          <li>Erasure of your personal data (right to be forgotten)</li>
          <li>Restriction or objection to our processing of your data</li>
          <li>Data portability</li>
          <li>
            Withdrawal of consent at any time (where processing is based on
            consent)
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at the details
          below.
        </p>
      </section>

      <section>
        <h2>Retention of Data</h2>
        <p>
          We retain your personal information only as long as necessary to
          fulfill the purposes outlined in this Privacy Policy or comply with
          legal requirements.
        </p>
      </section>

      <section>
        <h2>Cookies and Tracking</h2>
        <p>
          We do not currently use cookies or tracking technologies to collect
          personal information beyond what is necessary for the functionality
          and security of the website.
        </p>
      </section>

      <section>
        <h2>International Data Transfers</h2>
        <p>
          As our clients are located worldwide, including Europe, Poland, and
          the United States, your personal data may be transferred to and
          processed in countries outside of your own. We ensure appropriate
          safeguards are in place to protect your data in those transfers.
        </p>
      </section>

      <section>
        <h2>Children&apos;s Privacy</h2>
        <p>
          Our website is not intended for children under the age of 13, and we
          do not knowingly collect personal data from children under 13.
        </p>
      </section>

      <section>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated effective date.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy or your
          personal data, you may contact us by email: biencos.dev@gmail.com
        </p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;
