import { CONFIG } from 'src/global-config';
import { AuthGuard } from 'src/features/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <>{children}</>;
  }

  return <AuthGuard>{children}</AuthGuard>;
}
