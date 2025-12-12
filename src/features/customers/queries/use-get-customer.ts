import type { Customer } from '../data';
import type { UseQueryParamsOption } from 'src/types';

import { useQuery } from '@tanstack/react-query';

import { mapCustomer } from '../data';
import { customerApi, customerQueryKey } from '../api';

/* -------------------------------------------- */

export type UseCustomerReturn = Customer;
export type UseGetCustomerParams = UseQueryParamsOption<UseCustomerReturn>;

/* -------------------------------------------- */

export const useGetCustomer = (id: string | null, options: UseGetCustomerParams = {}) =>
  useQuery({
    queryKey: customerQueryKey.detail(id!),
    queryFn: async () => {
      const response = await customerApi.findById(id!);

      return mapCustomer(response);
    },
    enabled: !!id,
    ...options,
  });
