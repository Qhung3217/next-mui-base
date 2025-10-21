import axios, { HttpStatusCode } from 'axios';

import { CONFIG } from 'src/global-config';
import { refresh, signOut } from 'src/features/auth/stores/jwt';

import { errorHandler } from './error-handler';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': CONFIG.xApiKey,
  },
});

// Add token
// axiosInstance.interceptors.request.use((config) => {
//   const token = getCookie(JWT_ACCESS_TOKEN_KEY);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      try {
        const { accessToken } = await refresh();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest._retry = true;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        await signOut();
        window.location.reload();
        return Promise.reject(refreshError);
      }
    }

    errorHandler(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
