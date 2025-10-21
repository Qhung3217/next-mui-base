'use client';

import type { ChangePassWordSchemaType } from '../schema';

type Props = {
  onSubmit?: () => void;
  onLoading?: (loading: boolean) => void;
  onSuccess?: (data: ChangePassWordSchemaType) => void;
  onError?: (error: any) => void;
};
export default function useChangePasswordFormLogic({
  onError,
  onLoading,
  onSubmit: emitSubmit,
  onSuccess,
}: Props) {
  // const { changePassword } = useChangePassword();

  const handleSubmit = async (data: ChangePassWordSchemaType, reset: () => void) => {
    try {
      onLoading?.(true);
      // await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
      reset();
      onSuccess?.(data);
      emitSubmit?.();
    } catch (error: any) {
      console.error(error);
      onError?.(error);
    } finally {
      onLoading?.(false);
    }
  };

  return {
    handleSubmit,
  };
}
