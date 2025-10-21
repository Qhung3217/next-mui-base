import { useMutation } from '@tanstack/react-query';

import { fileService } from 'src/services';

export const useUploadFiles = () =>
  useMutation({
    mutationFn: fileService.uploadMany,
  });
