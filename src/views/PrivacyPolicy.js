import { Helmet } from 'react-helmet';
import useTranslations from '../hooks/useTranslations';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const locale = useTranslations();
  const t = locale.privacyPolicy;

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
          <h2>{t.sections.introduction.heading}</h2>
          <p>{t.sections.introduction.content}</p>
        </section>

        <section>
          <h2>{t.sections.informationWeCollect.heading}</h2>
          <h3>{t.sections.informationWeCollect.personal.heading}</h3>
          <p>{t.sections.informationWeCollect.personal.content}</p>
          <h3>{t.sections.informationWeCollect.automatic.heading}</h3>
          <p>{t.sections.informationWeCollect.automatic.content}</p>
        </section>

        <section>
          <h2>{t.sections.howWeUse.heading}</h2>
          <p>{t.sections.howWeUse.intro}</p>
          <ul>
            {t.sections.howWeUse.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.sections.legalBases.heading}</h2>
          <p>{t.sections.legalBases.intro}</p>
          <ul>
            {t.sections.legalBases.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.sections.dataSharing.heading}</h2>
          <p>{t.sections.dataSharing.content}</p>
        </section>

        <section>
          <h2>{t.sections.dataSecurity.heading}</h2>
          <p>{t.sections.dataSecurity.content}</p>
        </section>

        <section>
          <h2>{t.sections.yourRights.heading}</h2>
          <p>{t.sections.yourRights.intro}</p>
          <ul>
            {t.sections.yourRights.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>{t.sections.yourRights.contact}</p>
        </section>

        <section>
          <h2>{t.sections.retention.heading}</h2>
          <p>{t.sections.retention.content}</p>
        </section>

        <section>
          <h2>{t.sections.cookies.heading}</h2>
          <p>{t.sections.cookies.content}</p>
        </section>

        <section>
          <h2>{t.sections.internationalTransfers.heading}</h2>
          <p>{t.sections.internationalTransfers.content}</p>
        </section>

        <section>
          <h2>{t.sections.childrenPrivacy.heading}</h2>
          <p>{t.sections.childrenPrivacy.content}</p>
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

export default PrivacyPolicy;
