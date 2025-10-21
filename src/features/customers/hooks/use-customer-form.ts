'use client';

import type { Customer } from '../models';
import type { CustomerSchemaType } from '../schemas';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { GENDER } from 'src/constants';
import { withServerUrl } from 'src/utils';

import { NULL_VALUE } from 'src/components/hook-form';

import { CustomerSchema } from '../schemas';

type Props = {
  currentRecord?: Customer | null;
  defaultValues?: Partial<CustomerSchemaType>;
};
export const useCustomerForm = ({ currentRecord, defaultValues }: Props = {}) => {
  const isEdit = !!currentRecord;

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

  const methods = useForm<CustomerSchemaType>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: formDefaultValues,
    values: recordFormData,
  });

  return {
    methods,
    currentRecord,
  };
};
