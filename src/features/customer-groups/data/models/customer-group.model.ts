import type { Discount, Timestamp } from 'src/types';

export type CustomerGroup = Discount &
  Timestamp & {
    id: string;
    name: string;
    discountLabel: string;
  };
