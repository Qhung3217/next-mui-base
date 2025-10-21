'use client';

import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import 'dayjs/locale/fr';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/ar-sa';

import dayjs from 'dayjs';

import { viVN } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';

import { getCurrentLang } from './locales-config';

// ----------------------------------------------------------------------

const viLocale = viVN.components.MuiLocalizationProvider.defaultProps.localeText;

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  const currentLang = getCurrentLang('vi');
  dayjs.locale(currentLang.adapterLocale);

  return (
    <Provider
      dateAdapter={AdapterDayjs}
      adapterLocale={currentLang.adapterLocale}
      localeText={viLocale}
    >
      {children}
    </Provider>
  );
}
