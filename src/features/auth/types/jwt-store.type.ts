import type { Me } from '../data';

export type AuthenticationState = 'loading' | 'authenticated' | 'unauthenticated' | 'select-branch';

export type AuthState = {
  user: Me['user'] | null;
  currentBranch: Me['currentBranch'] | null;
  store: Me['store'] | null;
  authenticationState: AuthenticationState;
  loading: boolean;
};

export type AuthContextValue = {
  user: Me['user'] | null;
  currentBranch: Me['currentBranch'] | null;
  store: Me['store'] | null;
  permissions: string[];
  loading: boolean;
  authenticationState: AuthenticationState;
  checkUserSession?: () => Promise<void>;
  onSignInSuccess: (data: Pick<AuthState, 'store' | 'user'>) => void;
};
