import type { FileRejection } from 'react-dropzone';

import { fData } from 'src/utils';

export const getFileError = (error: FileRejection['errors'][0]) => {
  const { message, code } = error;
  if (code === 'file-invalid-type') {
    //"File type must be one of image/png, .png, image/jpeg, .jpeg, .jpg, image/webp, .webp"
    const extensions = message.match(/\.[a-z0-9]+/gi) || [];
    return {
      code,
      message: `Chấp nhập các định dạng: ${extensions.map((ext) => `${ext.slice(1)}`).join(', ')}`,
    };
  }

  if (code === 'file-too-large') {
    // "File is larger than 1048576 bytes"
    //"File is larger than 1048576 bytes and smaller than 2097152 bytes"
    const allNumbers = message.match(/\d+/g)?.map(Number) || [];
    if (allNumbers.length === 2) {
      return {
        code,
        message: `Kích thước tệp phải lớn hơn ${fData(allNumbers[0])} và nhỏ hơn ${fData(allNumbers[1])}`,
      };
    }
    if (allNumbers.length === 1) {
      return { code, message: `Kích thước tệp phải nhỏ hơn ${fData(allNumbers[0])}` };
    }
    return error;
  }
  return error;
};
