import { Helmet } from 'react-helmet';
import './TermsOfUse.css';

const TermsOfUse = () => (
  <div className='legal-page'>
    <Helmet>
      <title>Terms of Use - Portfolio</title>
      <meta property='og:title' content='Terms of Use - Portfolio' />
      <meta
        name='description'
        content='Terms of Use for our portfolio website and services.'
      />
    </Helmet>

    <div className='legal-content'>
      <h1>Terms of Use</h1>
      <p className='last-updated'>Effective Date: August 20, 2025</p>

      <section>
        <p>
          Welcome to our portfolio website. By accessing and using this website,
          you agree to comply with and be bound by the following terms:
        </p>
      </section>

      <section>
        <h2>Use of Website</h2>
        <ul>
          <li>
            The content on this website, including text, images, and code, is
            owned by us and is protected by intellectual property laws
          </li>
          <li>
            You may use the website for your personal, non-commercial purposes
            only
          </li>
          <li>
            You agree not to use this website for any unlawful purpose or in any
            way that may damage or impair its functionality
          </li>
        </ul>
      </section>

      <section>
        <h2>User Submissions</h2>
        <ul>
          <li>
            By submitting information through our website or communication
            channels, you warrant that the information provided is accurate and
            truthful
          </li>
          <li>
            You consent to the processing of this information as outlined in our
            Privacy Policy
          </li>
          <li>
            You acknowledge that communications through the website are not
            guaranteed to be secure
          </li>
        </ul>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <ul>
          <li>
            All intellectual property rights related to this website&apos;s
            content remain with us or the respective owners
          </li>
          <li>
            You may not reproduce, distribute, or create derivative works based
            on the website content without explicit permission
          </li>
        </ul>
      </section>

      <section>
        <h2>Disclaimers</h2>
        <ul>
          <li>
            This website is provided &quot;as is&quot; without any warranties,
            express or implied
          </li>
          <li>
            We do not guarantee the accuracy, completeness, or timeliness of the
            content
          </li>
          <li>
            We are not liable for any damages arising from the use or inability
            to use this website
          </li>
        </ul>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, we shall not be liable for any
          direct, indirect, incidental, consequential, or punitive damages
          arising out of your use of this website.
        </p>
      </section>

      <section>
        <h2>Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with
          applicable international laws and regulations, without regard to
          conflict of law principles.
        </p>
      </section>

      <section>
        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Use at any time. Changes
          will be posted on this page with the updated effective date.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          For any questions about these Terms of Use, please contact us by email
          biencos.dev@gmail.com
        </p>
      </section>
    </div>
  </div>
);

export default TermsOfUse;
