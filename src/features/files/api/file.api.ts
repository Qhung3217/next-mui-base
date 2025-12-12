import type { File as FileModel } from 'src/features/files';

import axios from 'src/lib/axios';

import { fileEndpoint } from './file.endpoint';

const ENDPOINT = fileEndpoint;

export type FileUploadManyResponse = FileModel[];

export const fileApi = {
  uploadMany: async (files: File[] | FileList) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('contents', files[i]);
    }

    const response = await axios.post<FileUploadManyResponse>(ENDPOINT.uploadMany, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
