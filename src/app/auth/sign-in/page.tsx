import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { JwtSignInView } from 'src/features/auth';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Đăng nhập hệ thống | ${CONFIG.appName}` };

export default function Page() {
  return <JwtSignInView />;
}
