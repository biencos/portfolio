import localeEN from '../locales/en.json';

/**
 * Hook to get translations
 * Currently supports English only
 * Future: Can be extended to support multiple languages
 *
 * Usage:
 *   const t = useTranslations();
 *   console.log(t.navbar.links.home); // "Home"
 */
const useTranslations = () => {
  return localeEN;
};

export default useTranslations;
