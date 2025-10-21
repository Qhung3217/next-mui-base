'use client';

import type { CustomerGroup } from '../models';
import type { CustomerGroupSchemaType } from '../schemas';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DISCOUNT_TYPE } from 'src/constants';

import { CustomerGroupSchema } from '../schemas';

type Props = {
  currentRecord?: CustomerGroup | null;
  defaultValues?: Partial<CustomerGroupSchemaType>;
};
export const useCustomerGroupForm = ({ currentRecord, defaultValues }: Props = {}) => {
  const isEdit = !!currentRecord;

  const recordFormData = useMemo((): CustomerGroupSchemaType | undefined => {
    console.log('🚀 ~ currentRecord:', currentRecord);

    if (!isEdit) return undefined;
    return {
      ...currentRecord,
      discountValue: currentRecord.discountValue.toString(),
      discountType: currentRecord.discountType as any,
    };
  }, [currentRecord, isEdit]);

  const formDefaultValues: CustomerGroupSchemaType = {
    name: '',
    discountType: DISCOUNT_TYPE.VALUE,
    discountValue: '0',
    ...defaultValues,
  };

  const methods = useForm<CustomerGroupSchemaType>({
    resolver: zodResolver(CustomerGroupSchema),
    defaultValues: formDefaultValues,
    values: recordFormData,
  });

  return {
    methods,
    currentRecord,
  };
};
