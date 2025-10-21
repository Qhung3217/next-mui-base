'use client';

import type { SignIn, AccessBranch } from '../../models';

import { getCookie } from 'minimal-shared/utils';

import { authService } from 'src/services';

import { mapSignIn, mapAccessBranch } from '../../mappers';
import { JWT_SIGN_IN_KEY, JWT_ACCESS_TOKEN_KEY, JWT_REFRESH_TOKEN_STORAGE_KEY } from './constant';
import {
  setSession,
  isValidToken,
  closeSession,
  setSignInSession,
  clearStorageTimeout,
} from './utils';

// ----------------------------------------------------------------------

export type SignInParams = {
  phone: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async (body: SignInParams): Promise<SignIn> => {
  try {
    const data = await authService.signIn(body);

    const { signInToken } = data;

    if (!signInToken) {
      throw new Error('Sign in token not found in response');
    }

    setSignInSession(JWT_SIGN_IN_KEY, signInToken as any);

    return mapSignIn(data);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
// export const signUp = async ({
//   email,
//   password,
//   firstName,
//   lastName,
// }: SignUpParams): Promise<void> => {
//   const params = {
//     email,
//     password,
//     firstName,
//     lastName,
//   };

//   try {
//     const res = await axios.post(authService.signIn, params);

//     const { accessToken } = res.data;

//     if (!accessToken) {
//       throw new Error('Access token not found in response');
//     }

//     sessionStorage.setItem(JWT_STORAGE_KEY, accessToken);
//   } catch (error) {
//     console.error('Error during sign up:', error);
//     throw error;
//   }
// };

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    closeSession();
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

/** **************************************
 * Refresh
 *************************************** */
export const refresh = async (): Promise<{ accessToken: string }> => {
  try {
    const refreshToken = getCookie<string>(JWT_REFRESH_TOKEN_STORAGE_KEY);
    if (!refreshToken) {
      throw new Error('Refresh token not found in response');
    }

    if (isValidToken(refreshToken)) {
      const data = await authService.refresh(refreshToken);
      clearStorageTimeout(JWT_ACCESS_TOKEN_KEY);

      setSession(JWT_ACCESS_TOKEN_KEY, data.accessToken, refresh);

      return { accessToken: data.accessToken };
    } else {
      throw new Error('Refresh token is expired');
    }
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

/** **************************************
 * Access branch
 *************************************** */
export const accessBranch = async (branchId: string): Promise<AccessBranch> => {
  try {
    const signInToken = sessionStorage.getItem(JWT_SIGN_IN_KEY);
    if (!signInToken) {
      throw new Error('Sign in token not found in response');
    }

    if (isValidToken(signInToken)) {
      const data = await authService.accessBranch(branchId);
      setSession(JWT_ACCESS_TOKEN_KEY, data.accessToken, refresh);
      setSession(JWT_REFRESH_TOKEN_STORAGE_KEY, data.refreshToken);
      sessionStorage.removeItem(JWT_SIGN_IN_KEY);
      clearStorageTimeout(JWT_SIGN_IN_KEY);

      return mapAccessBranch(data);
    } else {
      throw new Error('Sign in token is expired');
    }
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
