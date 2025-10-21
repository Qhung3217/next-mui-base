import { getErrorCodeObject } from '../utils';

export const DATABASE_ERROR = {
  ERR_DUPLICATE_DATA: {
    code: 'ERR_DUPLICATE_DATA',
    message: 'Dữ liệu đã tồn tại.',
  },
  ERR_RECORD_NOT_FOUND: {
    code: 'ERR_RECORD_NOT_FOUND',
    message: 'Không tìm thấy dữ liệu',
  },
  ERR_FROM_DATABASE: {
    code: 'ERR_FROM_DATABASE',
    message: 'Lỗi cơ sở dữ liệu',
  },
};

export const DATABASE_ERRORS = getErrorCodeObject([DATABASE_ERROR]);
