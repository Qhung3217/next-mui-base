import type { Customer } from '../data';
import type { CustomerParams } from '../types';
import type { ApiResponseList, UseQueryParamsOption } from 'src/types';

import { useQuery } from '@tanstack/react-query';

import { mapCustomerList } from '../data';
import { customerApi, customerQueryKey } from '../api';

/* -------------------------------------------- */

export type UseCustomersReturn = ApiResponseList<Customer[]>;
export type UseGetCustomersParams = {
  searchParams: CustomerParams;
  options?: UseQueryParamsOption<UseCustomersReturn>;
};

/* -------------------------------------------- */

export const useGetCustomers = (
  { searchParams, options }: UseGetCustomersParams = {
    searchParams: { page: 1, perPage: 10 },
  }
) =>
  useQuery({
    queryKey: customerQueryKey.list(searchParams),
    queryFn: async () => {
      const response = await customerApi.find(searchParams);

      return {
        list: mapCustomerList(response.list),
        meta: response.meta,
      };
    },
    ...options,
  });
