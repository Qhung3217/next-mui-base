import { z as zod } from 'zod';

export type CustomerGroupSchemaType = zod.infer<typeof CustomerGroupSchema>;

export const CustomerGroupSchema = zod
  .object({
    name: zod
      .string()
      .trim()
      .min(1, { message: 'Nhóm khách hàng là bắt buộc!' })
      .max(255, { message: 'Tối đa 255 ký tự' }),
    discountValue: zod.string().refine(
      (val) => {
        const price = Number(val.replace(/./g, ''));

        return !isNaN(price) && price >= 0;
      },
      {
        message: 'Chiết khấu phải là số không âm!',
      }
    ),
    discountType: zod.string(),
  })
  .superRefine(({ discountValue, discountType }, ctx) => {
    const discountAmount = Number(discountValue);

    if (discountType === 'PERCENT' && (discountAmount < 0 || discountAmount > 100)) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['discount'],
        message: 'Chiết khấu phần trăm phải từ 0 đến 100!',
      });
    }

    if (discountType === 'VALUE' && discountAmount < 0) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['discount'],
        message: 'Chiết khấu giá trị phải lớn hơn hoặc bằng 0!',
      });
    }
  });
