import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  xApiKey: string;
  isStaticExport: boolean;
  maxFileSize: number;
  auth: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
    defaultAccount: {
      username: string;
      password: string;
    };
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Pharmacy',
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  xApiKey: process.env.NEXT_PUBLIC_X_API_KEY ?? '',
  isStaticExport: JSON.parse(process.env.BUILD_STATIC_EXPORT ?? 'false'),
  maxFileSize: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE ?? '1048576 * 10'),
  /**
   * Auth
   * @method jwt
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.sale.root,
    defaultAccount: {
      username: process.env.NEXT_PUBLIC_DEFAULT_USERNAME ?? '',
      password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD ?? '',
    },
  },
};
