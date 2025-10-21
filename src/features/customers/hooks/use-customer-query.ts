import type { Customer } from '../models';
import type { UseQueryParamsOption } from 'src/types';

import { useQuery } from '@tanstack/react-query';

import { customersService } from 'src/services';

import { customerKeys } from '../api';
import { mapCustomer } from '../mappers';

/* -------------------------------------------- */

export type UseCustomerReturn = Customer;
export type UseCustomerQueryParams = UseQueryParamsOption<UseCustomerReturn>;

/* -------------------------------------------- */

export const useCustomerQuery = (id: string | null, options: UseCustomerQueryParams = {}) =>
  useQuery({
    queryKey: customerKeys.detail(id!),
    queryFn: async () => {
      const response = await customersService.findOne(id!);

      return mapCustomer(response);
    },
    enabled: !!id,
    ...options,
  });
