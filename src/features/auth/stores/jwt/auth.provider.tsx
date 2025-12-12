'use client';

import type { AuthState, AuthContextValue } from '../../types';

import { getCookie } from 'minimal-shared/utils';
import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import { authService } from 'src/services';

import { refresh } from './action';
import { mapMe } from '../../data';
import { AuthContext } from './auth.context';
import { setSession, isValidToken } from './utils';
import { JWT_ACCESS_TOKEN_KEY, JWT_REFRESH_TOKEN_STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    currentBranch: null,
    store: null,
    user: null,
    loading: true,
    authenticationState: 'loading',
  });

  const signOutState = () => {
    setState({
      currentBranch: null,
      store: null,
      user: null,
      loading: false,
      authenticationState: 'unauthenticated',
    });
  };

  const handleAccessTokenValid = async (token: string) => {
    setSession(JWT_ACCESS_TOKEN_KEY, token, refresh);
    const meData = await authService.me();
    setState({ ...mapMe(meData), loading: false, authenticationState: 'authenticated' });
  };

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = getCookie<string>(JWT_ACCESS_TOKEN_KEY);
      const refreshToken = getCookie<string>(JWT_REFRESH_TOKEN_STORAGE_KEY);
      if (accessToken && isValidToken(accessToken)) {
        await handleAccessTokenValid(accessToken);
        return;
      } else if (refreshToken && isValidToken(refreshToken)) {
        setSession(JWT_REFRESH_TOKEN_STORAGE_KEY, refreshToken);
        const data = await refresh();
        await handleAccessTokenValid(data.accessToken);
        return;
      }

      signOutState();
    } catch (error) {
      console.error(error);
      signOutState();
    }
  }, [setState]);

  const onSignInSuccess = useCallback(
    async (data: Pick<AuthState, 'store' | 'user'>) => {
      setState({
        user: data.user,
        store: data.store,
        loading: false,
        authenticationState: 'select-branch',
      });
    },
    [setState]
  );

  useEffect(() => {
    checkUserSession?.();
  }, []);

  // ----------------------------------------------------------------------

  const memoizedValue = useMemo(
    (): AuthContextValue => ({
      user: state?.user || null,
      currentBranch: state?.currentBranch || null,
      store: state?.store || null,
      checkUserSession,
      loading: state.authenticationState === 'loading',
      authenticationState: state.authenticationState,
      onSignInSuccess,
      permissions:
        state.user?.roles.flatMap((role: any) =>
          role.permissions.map((permission: any) => permission.code)
        ) || [],
    }),
    [checkUserSession, state, onSignInSuccess]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
