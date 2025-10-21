import type { Theme, Components } from '@mui/material/styles';

// MUI Core Locales
import { viVN as viVNCore } from '@mui/material/locale';
// MUI Date Pickers Locales
import { viVN as viVNDate } from '@mui/x-date-pickers/locales';
// MUI Data Grid Locales
import { viVN as viVNDataGrid } from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

// Supported languages
export const supportedLngs = ['vi'] as const;
export type LangCode = (typeof supportedLngs)[number];

// Fallback and default namespace
export const fallbackLng: LangCode = 'vi';
export const defaultNS = 'common';

// ----------------------------------------------------------------------

/**
 * @countryCode https://flagcdn.com/en/codes.json
 * @adapterLocale https://github.com/iamkun/dayjs/tree/master/src/locale
 * @numberFormat https://simplelocalize.io/data/locales/
 */

export type LangOption = {
  value: LangCode;
  label: string;
  countryCode: string;
  adapterLocale?: string;
  numberFormat: { code: string; currency: string };
  systemValue?: { components: Components<Theme> };
};

export const allLangs: LangOption[] = [
  {
    value: 'vi',
    label: 'Vietnamese',
    countryCode: 'VN',
    adapterLocale: 'vi',
    numberFormat: { code: 'vi-VN', currency: 'VND' },
    systemValue: {
      components: { ...viVNCore.components, ...viVNDate.components, ...viVNDataGrid.components },
    },
  },
];

// ----------------------------------------------------------------------

export function getCurrentLang(lang?: string): LangOption {
  const fallbackLang = allLangs.find((l) => l.value === fallbackLng) ?? allLangs[0];

  if (!lang) {
    return fallbackLang;
  }

  return allLangs.find((l) => l.value === lang) ?? fallbackLang;
}
