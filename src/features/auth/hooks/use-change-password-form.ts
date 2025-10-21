'use client';

import type { ChangePassWordSchemaType } from '../schema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ChangePassWordSchema } from '../schema';

type Props = {
  defaultValues?: Partial<ChangePassWordSchemaType>;
};
export const useChangePasswordForm = ({ defaultValues }: Props = {}) => {
  const formDefaultValues: ChangePassWordSchemaType = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    ...defaultValues,
  };

  const methods = useForm<ChangePassWordSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(ChangePassWordSchema),
    defaultValues: formDefaultValues,
  });

  return {
    methods,
  };
};
