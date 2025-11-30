import { Helmet } from 'react-helmet';
import useTranslations from '../hooks/useTranslations';
import './TermsOfUse.css';

const TermsOfUse = () => {
  const locale = useTranslations();
  const t = locale.termsOfUse;

  return (
    <div className='legal-page'>
      <Helmet>
        <title>
          {t.title} - {locale.site.title}
        </title>
        <meta
          property='og:title'
          content={`${t.title} - ${locale.site.title}`}
        />
        <meta name='description' content={t.metaDescription} />
      </Helmet>

      <div className='legal-content'>
        <h1>{t.title}</h1>
        <p className='last-updated'>{t.effectiveDate}</p>

        <section>
          <p>{t.intro}</p>
        </section>

        <section>
          <h2>{t.sections.useOfWebsite.heading}</h2>
          <ul>
            {t.sections.useOfWebsite.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.sections.userSubmissions.heading}</h2>
          <ul>
            {t.sections.userSubmissions.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.sections.intellectualProperty.heading}</h2>
          <ul>
            {t.sections.intellectualProperty.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.sections.disclaimers.heading}</h2>
          <ul>
            {t.sections.disclaimers.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.sections.limitationOfLiability.heading}</h2>
          <p>{t.sections.limitationOfLiability.content}</p>
        </section>

        <section>
          <h2>{t.sections.governingLaw.heading}</h2>
          <p>{t.sections.governingLaw.content}</p>
        </section>

        <section>
          <h2>{t.sections.changes.heading}</h2>
          <p>{t.sections.changes.content}</p>
        </section>

        <section>
          <h2>{t.sections.contact.heading}</h2>
          <p>
            {t.sections.contact.text}{' '}
            <a href='mailto:biencos.dev@gmail.com'>
              {t.sections.contact.email}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfUse;
