import type { FieldErrors } from 'react-hook-form';

interface ExtractedError {
  path: string;
  message: string;
  type: string;
  ref?: any;
  paths?: string[];
}

export const extractAllErrors = (errors: FieldErrors, path = '') => {
  const errorList: ExtractedError[] = [];

  const traverse = (obj: any, currentPath: string) => {
    if (!obj || typeof obj !== 'object') return;

    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newPath = currentPath ? `${currentPath}.${key}` : key;

      // Check if this is an error object (has message or type)
      if (value && typeof value === 'object') {
        if (value.message || value.type) {
          // This is an error object
          errorList.push({
            path: newPath,
            message: value.message || `${newPath} is invalid`,
            type: value.type || 'validation',
            ref: value.ref,
          });
        } else if (Array.isArray(value)) {
          // Handle array errors (like field arrays)
          value.forEach((item, index) => {
            if (item && typeof item === 'object') {
              traverse(item, `${newPath}[${index}]`);
            }
          });
        } else {
          // Nested object, continue traversing
          traverse(value, newPath);
        }
      }
    });
  };

  traverse(errors, path);
  return errorList;
};
