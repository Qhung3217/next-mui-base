'use client';

import type { SignInParams } from '../stores/jwt';

import { useState } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { getErrorMessage } from 'src/utils';

import { signInWithPassword } from '../stores/jwt';
import { useAuthContext } from './use-auth-context';

export function useJwtSignIn() {
  const router = useRouter();
  const { onSignInSuccess } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (credentials: SignInParams) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const data = await signInWithPassword(credentials);
      onSignInSuccess({
        store: data.store,
        user: data.user as any,
      });
      if (data.store.branches.length === 1) {
        router.refresh();
      } else {
        router.push(paths.auth.branch.select);
      }

      return { success: true };
    } catch (err) {
      console.error('Sign in error:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    error,
    isSubmitting,
    handleSignIn,
    setError,
  };
}
