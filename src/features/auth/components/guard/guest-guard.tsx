'use client';

import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useReturnTo } from 'src/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../../hooks';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();
  const { returnTo, createRedirectPath } = useReturnTo();

  const { loading, authenticationState } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async (): Promise<void> => {
    switch (authenticationState) {
      case 'loading':
        break;

      case 'authenticated': {
        router.replace(returnTo);
        break;
      }

      case 'select-branch': {
        if (returnTo.includes(paths.auth.branch.select)) {
          router.replace(returnTo);
          break;
        }
        router.replace(createRedirectPath(paths.auth.branch.select, returnTo));
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
  }, [authenticationState, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
