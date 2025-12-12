import type { Discount, Timestamp } from 'src/types';

export type CustomerGroupDTO = Discount &
  Timestamp & {
    id: string;
    name: string;
  };
