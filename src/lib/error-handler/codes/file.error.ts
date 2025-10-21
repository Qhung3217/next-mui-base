import { getErrorCodeObject } from '../utils';

export const FILE_ERROR = {
  FILE_NOT_FOUND: {
    code: 'FILE_01',
    message: 'Không tìm thấy file',
  },
  FILE_INVALID: {
    code: 'FILE_02',
    message: 'File không hợp lệ',
  },
};

export const FILE_ERRORS = getErrorCodeObject([FILE_ERROR]);
