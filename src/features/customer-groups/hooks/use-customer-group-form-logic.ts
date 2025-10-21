'use client';

import type { CustomerGroup } from '../models';
import type { CustomerGroupSchemaType } from '../schemas';

import { handleCreateOptions } from 'src/components/hook-form';

import { useCreateCustomerGroup } from './use-create-customer-group';
import { useUpdateCustomerGroup } from './use-update-customer-group';

type Props = {
  currentRecord?: CustomerGroup | null;
  onLoading?: (loading: boolean) => void;
  onSuccess?: (data: CustomerGroupSchemaType, isEdit: boolean) => void;
  onError?: (error: any) => void;
  onCreateOnly?: () => void;
  onUpdated?: () => void;
};
export function useCustomerGroupFormLogic({
  currentRecord,
  onError,
  onLoading,
  onSuccess,
  onCreateOnly,
  onUpdated,
}: Props) {
  const isEdit = !!currentRecord;

  const { mutateAsync: createCustomerGroup } = useCreateCustomerGroup();
  const { mutateAsync: updateCustomerGroup } = useUpdateCustomerGroup();

  const handleSubmit = async (data: CustomerGroupSchemaType, event: any, reset: () => void) => {
    try {
      onLoading?.(true);
      const payload = {
        ...data,
        discountValue: data.discountValue ? Number(data.discountValue) : undefined,
        discountType: data.discountType ? (data.discountType as any) : undefined,
      };

      if (!isEdit) {
        await createCustomerGroup(payload);
        handleCreateOptions(event, {
          onCreateOnly: () => {
            onCreateOnly?.();
          },
          onCreateAndReset: () => {
            reset();
          },
        });
      } else {
        await updateCustomerGroup({ id: currentRecord.id, body: payload });

        onUpdated?.();
      }
      onSuccess?.(data, isEdit);
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
