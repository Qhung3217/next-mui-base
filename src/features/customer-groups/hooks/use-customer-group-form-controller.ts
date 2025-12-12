import type { CustomerGroup } from '../data';
import type { DiscountType } from 'src/types';
import type { CustomerGroupSchemaType } from '../schemas';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { DISCOUNT_TYPE } from 'src/constants';

import { extractAllErrors, handleCreateOptions } from 'src/components/hook-form';

import { CustomerGroupSchema } from '../schemas';
import { useCreateCustomerGroup, useUpdateCustomerGroup } from '../queries';

type UseCustomerGroupFormControllerProps = {
  currentRecord?: CustomerGroup | null;
  defaultValues?: Partial<CustomerGroupSchemaType>;
  onLoading?: (value: boolean) => void;
  onSuccess?: (data: CustomerGroupSchemaType, isEdit: boolean) => void;
  onError?: (err: any) => void;
  onCreateOnly?: () => void;
  onUpdated?: () => void;
};

export function useCustomerGroupFormController({
  currentRecord,
  defaultValues,
  onError,
  onLoading,
  onSuccess,
  onCreateOnly,
  onUpdated,
}: UseCustomerGroupFormControllerProps) {
  const isEdit = !!currentRecord;

  const formDefaultValues: CustomerGroupSchemaType = {
    name: '',
    discountType: DISCOUNT_TYPE.VALUE,
    discountValue: '0',
    ...defaultValues,
  };

  // -------- Fill form when edit ----------
  const recordFormData = useMemo((): CustomerGroupSchemaType | undefined => {
    if (!isEdit) return undefined;
    return {
      ...currentRecord,
      discountValue: currentRecord.discountValue.toString(),
      discountType: currentRecord.discountType as any,
    };
  }, [currentRecord, isEdit]);

  const methods = useForm<CustomerGroupSchemaType>({
    resolver: zodResolver(CustomerGroupSchema),
    defaultValues: formDefaultValues,
    values: recordFormData,
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
  const { mutateAsync: createCustomerGroup } = useCreateCustomerGroup();
  const { mutateAsync: updateCustomerGroup } = useUpdateCustomerGroup();

  // -------- Submit logic ----------
  const handleSubmit = async (data: CustomerGroupSchemaType, event?: any) => {
    try {
      onLoading?.(true);

      const payload = {
        ...data,
        discountValue: Number(data.discountValue),
        discountType: data.discountType as DiscountType,
      };

      if (!isEdit) {
        // CREATE
        await createCustomerGroup(payload);

        handleCreateOptions(event, {
          onCreateOnly: () => onCreateOnly?.(),
          onCreateAndReset: () => reset(),
        });
      } else {
        // UPDATE
        await updateCustomerGroup({
          id: currentRecord!.id,
          body: payload,
        });

        onUpdated?.();
      }

      onSuccess?.(data, isEdit);
    } catch (error) {
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
