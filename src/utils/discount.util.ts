import type { DiscountType } from 'src/types';

import { DISCOUNT_TYPE } from 'src/constants';

import { fCurrency } from './format-number.util';

export const calculateDiscountAmount = (
  subtotal: number,
  discountType: string,
  discountValue: number
) => {
  const calcValue =
    discountType === DISCOUNT_TYPE.PERCENT ? subtotal * (discountValue / 100) : discountValue;

  return {
    discountAmount: calcValue,
    discountType,
    discountValue,
  };
};

export const formatDiscountLabel = (discountType: DiscountType, discountValue: number) => {
  if (discountType === DISCOUNT_TYPE.PERCENT) {
    return `${discountValue}%`;
  }

  return fCurrency(discountValue, {
    showSymbol: true,
  });
};

export const mapDiscountType = (type: string): DiscountType => {
  if (type === 'PERCENT') {
    return DISCOUNT_TYPE.PERCENT;
  }
  return DISCOUNT_TYPE.VALUE;
};
