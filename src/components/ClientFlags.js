import useTranslations from '../hooks/useTranslations';
import './ClientFlags.css';

const ClientFlags = () => {
  const t = useTranslations();
  const clientCountries = [
    {
      code: 'US',
      flag: '/usa.svg',
      name: t.clientFlags.countryNames.unitedStates,
      altText: t.clientFlags.countryFlags.unitedStates,
    },
    {
      code: 'GB',
      flag: '/uk.svg',
      name: t.clientFlags.countryNames.unitedKingdom,
      altText: t.clientFlags.countryFlags.unitedKingdom,
    },
    {
      code: 'PL',
      flag: '/poland.svg',
      name: t.clientFlags.countryNames.poland,
      altText: t.clientFlags.countryFlags.poland,
    },
    {
      code: 'KR',
      flag: '/south korea.svg',
      name: t.clientFlags.countryNames.southKorea,
      altText: t.clientFlags.countryFlags.southKorea,
    },
    {
      code: 'NO',
      flag: '/norway.svg',
      name: t.clientFlags.countryNames.norway,
      altText: t.clientFlags.countryFlags.norway,
    },
  ];

  // Triple the flags for infinite scroll
  const tripleFlags = [
    ...clientCountries,
    ...clientCountries,
    ...clientCountries,
  ];

  return (
    <section className='client-flags-section'>
      <div className='client-flags-container'>
        <div className='client-flags-header'>
          <h2
            className='client-flags-main-heading'
            aria-label={t.clientFlags.ariaLabels.countryListHeading}
          >
            {t.clientFlags.sectionTitle}
          </h2>
          <p className='client-flags-heading'>
            {t.clientFlags.sectionSubtitle}
          </p>
        </div>
        <div className='client-flags-scroll-container'>
          <div className='client-flags-row'>
            {tripleFlags.map((country, index) => (
              <div
                key={`${country.code}-${index}`}
                className='client-flag-item'
              >
                <img
                  src={country.flag}
                  alt={country.altText}
                  className='client-flag-image'
                />
                <span className='client-flag-name'>{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFlags;
