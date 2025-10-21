export type DiscountType = 'PERCENT' | 'VALUE';

export type Discount = {
  discountType: DiscountType;
  discountValue: number;
};
