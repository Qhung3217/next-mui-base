import { getCurrentLang } from '../locales-config';

// ----------------------------------------------------------------------

export function formatNumberLocale() {
  const currentLang = getCurrentLang('vi');

  return {
    code: currentLang?.numberFormat.code,
    currency: currentLang?.numberFormat.currency,
  };
}
