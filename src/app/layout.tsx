import 'src/global.css';

import type { Metadata, Viewport } from 'next';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { QueryProvider } from 'src/lib';
import { CONFIG } from 'src/global-config';
import { AuthProvider } from 'src/features/auth';
import { LocalizationProvider } from 'src/locales';
import { themeConfig, ThemeProvider, primary as primaryColor } from 'src/theme';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { detectSettings } from 'src/components/settings/server';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primaryColor.main,
};

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon/favicon.ico`,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: `${CONFIG.assetsDir}/favicon/favicon-16x16.png`,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: `${CONFIG.assetsDir}/favicon/favicon-32x32.png`,
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};

// ----------------------------------------------------------------------

type RootLayoutProps = {
  children: React.ReactNode;
};

async function getAppConfig() {
  if (CONFIG.isStaticExport) {
    return {
      cookieSettings: undefined,
      dir: defaultSettings.direction,
    };
  } else {
    const [settings] = await Promise.all([detectSettings()]);

    return {
      cookieSettings: settings,
      dir: settings.direction,
    };
  }
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const appConfig = await getAppConfig();

  return (
    <html lang="en" dir={appConfig.dir} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          modeStorageKey={themeConfig.modeStorageKey}
          attribute={themeConfig.cssVariables.colorSchemeSelector}
          defaultMode={themeConfig.defaultMode}
        />

        <QueryProvider>
          <AuthProvider>
            <SettingsProvider
              cookieSettings={appConfig.cookieSettings}
              defaultSettings={defaultSettings}
            >
              <LocalizationProvider>
                <AppRouterCacheProvider options={{ key: 'css' }}>
                  <ThemeProvider
                    modeStorageKey={themeConfig.modeStorageKey}
                    defaultMode={themeConfig.defaultMode}
                  >
                    <MotionLazy>
                      <Snackbar />
                      <ProgressBar />
                      <SettingsDrawer defaultSettings={defaultSettings} />
                      {children}
                    </MotionLazy>
                  </ThemeProvider>
                </AppRouterCacheProvider>
              </LocalizationProvider>
            </SettingsProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
