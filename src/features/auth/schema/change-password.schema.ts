import { z as zod } from 'zod';

export type ChangePasswordSchemaType = zod.infer<typeof ChangePasswordSchema>;

export const ChangePasswordSchema = zod
  .object({
    oldPassword: zod
      .string()
      .min(1, { message: 'Mật khẩu là bắt buộc!' })
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự!' }),
    newPassword: zod
      .string()
      .min(1, { message: 'Mật khẩu mới là bắt buộc!' })
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự!' })
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt'
      ),
    confirmNewPassword: zod.string().min(1, { message: 'Nhập lại mật khẩu là bắt buộc!' }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu cũ!',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Mật khẩu khống giống nhau!',
    path: ['confirmNewPassword'],
  });
