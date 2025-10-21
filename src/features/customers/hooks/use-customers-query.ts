import type { Customer } from '../models';
import type { CustomerParams } from '../types';
import type { ApiResponseList, UseQueryParamsOption } from 'src/types';

import { useQuery } from '@tanstack/react-query';

import { customersService } from 'src/services';

import { customerKeys } from '../api';
import { mapCustomerList } from '../mappers';

/* -------------------------------------------- */

export type UseCustomersReturn = ApiResponseList<Customer[]>;
export type UseCustomersQueryParams = {
  searchParams: CustomerParams;
  options?: UseQueryParamsOption<UseCustomersReturn>;
};

/* -------------------------------------------- */

export const useCustomersQuery = (
  { searchParams, options }: UseCustomersQueryParams = {
    searchParams: { page: 1, perPage: 10 },
  }
) =>
  useQuery({
    queryKey: customerKeys.list(searchParams),
    queryFn: async () => {
      const response = await customersService.findMany(searchParams);

      return {
        list: mapCustomerList(response.list),
        meta: response.meta,
      };
    },
    ...options,
  });
