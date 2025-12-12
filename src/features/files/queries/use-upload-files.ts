import { useMutation } from '@tanstack/react-query';

import { fileApi } from '../api';

export const useUploadFiles = () =>
  useMutation({
    mutationFn: fileApi.uploadMany,
  });
