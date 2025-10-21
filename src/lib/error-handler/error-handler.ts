import type { HttpError } from 'src/types/http.type';

import { toast } from 'sonner';
import { HttpStatusCode, type AxiosError } from 'axios';

import { getErrorDetails } from 'src/utils';

import { AUTH_ERRORS, FILE_ERRORS, GUARD_ERRORS, DATABASE_ERRORS } from './codes';

const ERROR_OBJECT = {
  ...AUTH_ERRORS,
  ...GUARD_ERRORS,
  ...FILE_ERRORS,
  ...DATABASE_ERRORS,
};

export const errorHandler = (error: AxiosError<HttpError>) => {
  console.log('🚀 ~ errorHandler ~ error:', error);

  const { status } = error;

  let errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại sau!';

  switch (true) {
    // Cache all client side errors
    case status &&
      status >= HttpStatusCode.BadRequest &&
      status <= HttpStatusCode.UnavailableForLegalReasons: {
      const errorDetails = getErrorDetails(error);

      if (errorDetails) {
        const { errorCode, invalidValue } = errorDetails;
        errorMessage = ERROR_OBJECT[errorCode]
          ? ERROR_OBJECT[errorCode] + (invalidValue ? ': ' + invalidValue : '')
          : errorMessage;
      }

      toast.error(errorMessage);
      return;
    }

    // Cache other errors
    default:
      toast.error(errorMessage);
      return;
  }
};
