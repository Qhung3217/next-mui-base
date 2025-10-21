import type { DiscountType } from 'src/types';

export const DISCOUNT_TYPE: { [K in DiscountType]: K } = {
  PERCENT: 'PERCENT',
  VALUE: 'VALUE',
};

export const DISCOUNT_TYPE_ARRAY: DiscountType[] = Object.values(DISCOUNT_TYPE);
