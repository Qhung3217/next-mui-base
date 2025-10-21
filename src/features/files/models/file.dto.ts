import type { Timestamp } from 'src/types';

export type FileDTO = Timestamp & {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  type: string;
};

export type FileShortDTO = {
  id: string;
  filename: string;
  originalName: string;
  path: string;
};
