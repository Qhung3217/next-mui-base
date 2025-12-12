import type { Gender } from 'src/types';
import type { CustomerSchemaType } from '../schemas';
import type { CreateCustomerPayload } from '../types';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { GENDER } from 'src/constants';
import { withServerUrl } from 'src/utils';
import { useUploadFiles } from 'src/features/files';

import { NULL_VALUE, extractAllErrors, handleCreateOptions } from 'src/components/hook-form';

import { CustomerSchema } from '../schemas';
import { mapCustomer, type Customer } from '../data';
import { useCreateCustomer, useUpdateCustomer } from '../queries';

type UseCustomerFormControllerProps = {
  currentRecord?: Customer | null;
  defaultValues?: Partial<CustomerSchemaType>;
  onLoading?: (value: boolean) => void;
  onSuccess?: (data: Customer, isEdit: boolean) => void;
  onError?: (err: any) => void;
  onCreateOnly?: () => void;
  onUpdated?: () => void;
};

export function useCustomerFormController({
  currentRecord,
  defaultValues,
  onError,
  onLoading,
  onSuccess,
  onCreateOnly,
  onUpdated,
}: UseCustomerFormControllerProps) {
  const isEdit = !!currentRecord;

  const formDefaultValues: CustomerSchemaType = {
    name: '',
    birthday: '',
    code: '',
    phone: '',
    email: '',
    note: '',
    gender: GENDER.MALE,
    customerGroupId: NULL_VALUE,
    avatarPath: '',
    ...defaultValues,
  };

  // -------- Fill form when edit ----------
  const recordFormData = useMemo((): CustomerSchemaType | undefined => {
    if (!isEdit) return undefined;
    return {
      ...currentRecord,
      phone: currentRecord.phone || '',
      email: currentRecord.email || '',
      customerGroupId: currentRecord.customerGroupId || NULL_VALUE,
      gender: currentRecord.gender || GENDER.MALE,
      birthday: currentRecord.birthday || '',
      avatarPath: currentRecord.avatar ? (withServerUrl(currentRecord.avatar.path) as string) : '',
    };
  }, [currentRecord, isEdit]);

  const methods = useForm<CustomerSchemaType>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: formDefaultValues,
    values: recordFormData,
  });

  const {
    reset,
    formState: { errors, dirtyFields },
    setValue,
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
  const { mutateAsync: createCustomer } = useCreateCustomer();
  const { mutateAsync: updateCustomer } = useUpdateCustomer();
  const { mutateAsync: uploadFiles } = useUploadFiles();

  // -------- Submit logic ----------
  const handleSubmit = async (data: CustomerSchemaType, event?: any) => {
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
    methods,
    handleSubmit,
    isEdit,
    currentRecord,
  };
}
