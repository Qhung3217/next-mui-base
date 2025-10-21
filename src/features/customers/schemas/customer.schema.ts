import { z as zod } from 'zod';

import { schemaUtils } from 'src/components/hook-form';

export type CustomerSchemaType = zod.infer<typeof CustomerSchema>;

export const CustomerSchema = zod.object({
  name: zod
    .string()
    .trim()
    .min(1, { message: 'Tên khách hàng là bắt buộc!' })
    .max(255, { message: 'Tối đa 255 ký tự' }),

  code: zod
    .string()
    .refine(
      (val) => {
        if (!val) return true;
        return !val.includes(' ');
      },
      {
        message: 'Mã khách hàng không nhập khoảng trắng!',
      }
    )
    .refine(
      (val) => {
        if (!val) return true;
        return val.length <= 50;
      },
      {
        message: 'Tối đa 50 ký tự',
      }
    ), // max bao nhiu
  gender: zod.string(),
  phone: zod
    .string()
    .refine(
      (val) => {
        if (!val) return true;
        return /^[0-9]+$/.test(val);
      },
      {
        error: 'Số điện thoại không hợp lệ',
      }
    )
    .max(20, { message: 'Tối đa 20 ký tự' }),
  email: schemaUtils
    .email({
      optional: true,
      error: {
        invalid: 'Email không hợp lệ.',
      },
    })
    .max(100, 'Tối đa 100 ký tự'),
  birthday: schemaUtils.birthday({
    optional: true,
    error: {
      invalid: 'Ngày sinh không hợp lệ.',
    },
  }),
  avatarPath: schemaUtils.file({
    optional: true,
  }),

  customerGroupId: zod.string(),

  note: zod.string().max(500, 'Tối đa 500 ký tự'),
});
