import './ClientFlags.css';

const ClientFlags = () => {
  const clientCountries = [
    { code: 'US', name: 'United States', flag: '/usa.svg' },
    { code: 'GB', name: 'United Kingdom', flag: '/uk.svg' },
    { code: 'PL', name: 'Poland', flag: '/poland.svg' },
    { code: 'KR', name: 'South Korea', flag: '/south korea.svg' },
    { code: 'NO', name: 'Norway', flag: '/norway.svg' },
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
          <h2 className='client-flags-main-heading'>Clients</h2>
          <p className='client-flags-heading'>
            Business partners from all over the world
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
                  alt={`${country.name} flag`}
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
