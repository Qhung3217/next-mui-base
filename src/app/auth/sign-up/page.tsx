import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { JwtSignUpView } from 'src/features/auth';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign up | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <JwtSignUpView />;
}
