'use client';

import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useReturnTo } from 'src/hooks';
import { CONFIG } from 'src/global-config';
import { useAuthContext } from 'src/features/auth';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

const signInPaths = {
  jwt: paths.auth.jwt.signIn,
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { createRedirectPath } = useReturnTo();

  const { authenticationState } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async (): Promise<void> => {
    switch (authenticationState) {
      case 'loading':
        break;
      case 'unauthenticated': {
        const { method } = CONFIG.auth;

        const signInPath = signInPaths[method];
        const redirectPath = createRedirectPath(signInPath);

        router.replace(redirectPath);

        break;
      }
      case 'select-branch': {
        const redirectPath = createRedirectPath(paths.auth.branch.select);

        router.replace(redirectPath);
        setIsChecking(false);

        break;
      }

      default:
        setIsChecking(false);

        break;
    }
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationState]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
