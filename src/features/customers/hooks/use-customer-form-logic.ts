'use client';

import type { UseFormSetValue } from 'react-hook-form';
import type { Gender } from 'src/types';
import type { Customer } from '../models';
import type { CustomerSchemaType } from '../schemas';
import type { CreateCustomerPayload } from '../types';

import { useUploadFiles } from 'src/features/files';

import { NULL_VALUE, handleCreateOptions } from 'src/components/hook-form';

import { mapCustomer } from '../mappers';
import { useCreateCustomer } from './use-create-customer';
import { useUpdateCustomer } from './use-update-customer';

type Props = {
  currentRecord?: Customer | null;
  onLoading?: (loading: boolean) => void;
  onSuccess?: (data: Customer, isEdit: boolean) => void;
  onError?: (error: any) => void;
  onCreateOnly?: () => void;
  onUpdated?: () => void;
  setValue: UseFormSetValue<CustomerSchemaType>;
  dirtyFields: {
    avatarPath?: boolean;
  };
};
export function useCustomerFormLogic({
  currentRecord,
  onError,
  onLoading,
  onSuccess,
  onCreateOnly,
  onUpdated,
  dirtyFields,
  setValue,
}: Props) {
  const isEdit = !!currentRecord;

  const { mutateAsync: createCustomer } = useCreateCustomer();
  const { mutateAsync: updateCustomer } = useUpdateCustomer();

  const { mutateAsync: uploadFiles } = useUploadFiles();

  const handleSubmit = async (data: CustomerSchemaType, event: any, reset: () => void) => {
    try {
      onLoading?.(true);
      const { avatarPath, ...othersData } = data;
      const payload: CreateCustomerPayload = {
        ...othersData,
        email: data.email || undefined,
        phone: data.phone || undefined,
        birthday: data.birthday || undefined,
        gender: (data.gender as Gender) || undefined,
        customerGroupId: data.customerGroupId === NULL_VALUE ? null : data.customerGroupId,
      };

      if (!isEdit) {
        if (avatarPath && avatarPath instanceof File) {
          const fileResponse = await uploadFiles([avatarPath]);
          payload.avatarId = fileResponse[0].id;
        }

        const createResponse = await createCustomer(payload);

        if (onSuccess) {
          onSuccess(mapCustomer(createResponse), isEdit);
        } else {
          handleCreateOptions(event, {
            onCreateOnly: () => {
              onCreateOnly?.();
            },
            onCreateAndContinue: () => {
              setValue('phone', '', {
                shouldValidate: true,
              });
              setValue('email', '', {
                shouldValidate: true,
              });
              setValue('code', '', {
                shouldValidate: true,
              });
            },
            onCreateAndReset: () => {
              reset();
            },
          });
        }
      } else {
        if (dirtyFields.avatarPath && avatarPath instanceof File) {
          const fileResponse = await uploadFiles([avatarPath]);
          payload.avatarId = fileResponse[0].id;
        }
        const updateResponse = await updateCustomer({ id: currentRecord.id, body: payload });
        if (onSuccess) {
          onSuccess(mapCustomer(updateResponse), isEdit);
        } else {
          onUpdated?.();
        }
      }
    } catch (error: any) {
      onError?.(error);
    } finally {
      onLoading?.(false);
    }
  };

  return {
    handleSubmit,
    isEdit,
  };
}
