import type { Timestamp } from 'src/types';

export type File = Timestamp & {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  type: string;
};

export type FileShort = {
  id: string;
  filename: string;
  originalName: string;
  path: string;
};
