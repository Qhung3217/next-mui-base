import { AuthGuard } from 'src/guard';
import { CONFIG } from 'src/global-config';

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
