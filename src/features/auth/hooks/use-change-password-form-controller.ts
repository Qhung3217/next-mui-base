'use client';

import type { ChangePasswordSchemaType } from '../schema';

import { toast } from 'sonner';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { extractAllErrors } from 'src/components/hook-form';

import { ChangePasswordSchema } from '../schema';

type UseChangePasswordFormControllerProps = {
  defaultValues?: Partial<ChangePasswordSchemaType>;
  onLoading?: (value: boolean) => void;
  onSuccess?: () => void;
  onError?: (err: any) => void;
  onCreateOnly?: () => void;
  onUpdated?: () => void;
};

export function useChangePasswordFormController({
  defaultValues,
  onError,
  onLoading,
  onSuccess,
}: UseChangePasswordFormControllerProps) {
  const formDefaultValues: ChangePasswordSchemaType = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    ...defaultValues,
  };

  const methods = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: formDefaultValues,
  });

  const {
    reset,
    formState: { errors },
  } = methods;

  // -------- Alert errors ----------
  useEffect(() => {
    const errorExtracted = extractAllErrors(errors);
    errorExtracted.forEach((error: any) => {
      toast.error(error.message, {
        position: 'bottom-right',
      });
    });
  }, [errors]);

  // -------- Mutations ----------
  // const { changePassword } = useChangePassword();

  // -------- Submit logic ----------
  const handleSubmit = async (data: ChangePasswordSchemaType, event?: any) => {
    try {
      onLoading?.(true);
      // await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
      reset();
      onSuccess?.();
    } catch (error: any) {
      console.error(error);
      onError?.(error);
    } finally {
      onLoading?.(false);
    }
  };

  return {
    methods,
    handleSubmit,
  };
}
