import * as z from 'zod';

export const SignInSchema = z.object({
  phone: z.string().trim().min(1, { message: 'Số điện thoại là bắt buộc.' }),

  password: z
    .string()
    .trim()
    .min(1, { message: 'Mật khẩu là bắt buộc.' })
    .min(6, { message: 'Mật khẩu ít nhất 6 kí tự.' }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
