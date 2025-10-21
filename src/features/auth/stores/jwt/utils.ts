import { setCookie, removeCookie } from 'minimal-shared/utils';

import { paths } from 'src/routes/paths';

import axios from 'src/lib/axios';

import { JWT_SIGN_IN_KEY, JWT_ACCESS_TOKEN_KEY, JWT_REFRESH_TOKEN_STORAGE_KEY } from './constant';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(key: string, exp: number, callback: () => void) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  const timerId = setTimeout(() => {
    try {
      callback();
    } catch (error) {
      console.error('Error during token expiration:', error);
      throw error;
    }
  }, timeLeft);
  setStorageTimeoutId(key, timerId);
}

// ----------------------------------------------------------------------

export async function setSession(
  key: string,
  token: string | null,
  onTokenExpired: () => void = () => {
    removeCookie(key);
    clearStorageTimeout(key);
    alert('Phiên đăng nhập đã hết hạn!');
    window.location.href = paths.auth.jwt.signIn;
  }
) {
  try {
    if (token) {
      setCookie(key, token);

      if (key === JWT_ACCESS_TOKEN_KEY || key === JWT_SIGN_IN_KEY)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const decodedToken = jwtDecode(token);

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(key, decodedToken.exp, onTokenExpired);
      } else {
        throw new Error('Invalid token!');
      }
    } else {
      removeCookie(key);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function setSignInSession(key: string, token: string | null) {
  try {
    if (token) {
      sessionStorage.setItem(key, token);

      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const decodedToken = jwtDecode(token);

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(key, decodedToken.exp, () => {
          sessionStorage.removeItem(key);
          alert('Phiên đăng nhập đã hết hạn!');
          window.location.href = paths.auth.jwt.signIn;
        });
      } else {
        throw new Error('Invalid token!');
      }
    } else {
      sessionStorage.removeItem(key);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function closeSession() {
  try {
    removeCookie(JWT_ACCESS_TOKEN_KEY);
    removeCookie(JWT_REFRESH_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(JWT_SIGN_IN_KEY);
    clearStorageTimeout(JWT_ACCESS_TOKEN_KEY);
    clearStorageTimeout(JWT_REFRESH_TOKEN_STORAGE_KEY);
    delete axios.defaults.headers.common.Authorization;
    // window.location.href = paths.auth.jwt.signIn;
  } catch (error) {
    console.error('Error during remove session:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function clearStorageTimeout(key: string) {
  const timeoutId = sessionStorage.getItem(key + '_timeout_id');
  if (timeoutId) {
    clearTimeout(timeoutId);
    sessionStorage.removeItem(key + '_timeout_id');
  }
}

// ----------------------------------------------------------------------

export function setStorageTimeoutId(key: string, timeoutId: NodeJS.Timeout) {
  sessionStorage.setItem(key + '_timeout_id', JSON.stringify(timeoutId));
}
