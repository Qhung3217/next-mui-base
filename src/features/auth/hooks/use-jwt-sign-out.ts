'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { signOut } from '../stores/jwt';
import { useAuthContext } from './use-auth-context';

export function useJwtSignOut() {
  const router = useRouter();

  const { checkUserSession } = useAuthContext();

  const handleLogout = useCallback(
    async (onSuccess?: () => void) => {
      try {
        await signOut();
        await checkUserSession?.();
        onSuccess?.();
        router.refresh();
        //   router.push(paths.auth.jwt.signIn);
      } catch (error) {
        console.error(error);
      }
    },
    [checkUserSession, router]
  );

  return {
    handleLogout,
  };
}
