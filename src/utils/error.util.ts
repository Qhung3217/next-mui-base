import type { AxiosResponse } from 'axios';
import type { HttpError } from 'src/types';

import { isAxiosError } from 'axios';

type AxiosErrorResponse = AxiosResponse<HttpError>;

export const getErrorMessage = (error: unknown): string => {
  // Case 1: Axios error with response
  if (isAxiosError(error)) {
    const axiosError = error as { response?: AxiosErrorResponse };

    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    if (axiosError.response?.statusText) {
      return axiosError.response.statusText;
    }

    if (axiosError.response?.status) {
      return `HTTP Error ${axiosError.response.status}`;
    }
  }
  // Case 1.2: Axios error without response
  if ((error as any)?.name === 'AxiosError') {
    return 'Lỗi kết nối tới máy chủ';
  }

  // Case 2: Standard Error object
  if (error instanceof Error) {
    return error.message;
  }

  // Case 3: String error
  if (typeof error === 'string') {
    return error;
  }

  // Case 4: Unknown error type
  return 'Lỗi không xác định';
};

export const getErrorDetails = (error: unknown): HttpError | null => {
  if (isAxiosError(error)) {
    const axiosError = error as { response?: AxiosErrorResponse };
    return axiosError.response?.data || null;
  }

  return null;
};
