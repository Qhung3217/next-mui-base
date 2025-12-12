import type { CustomerGroup } from '../data';
import type { UseQueryParamsOption } from 'src/types';

import { useQuery } from '@tanstack/react-query';

import { mapCustomerGroup } from '../data';
import { customerGroupApi, customerGroupQueryKey } from '../api';

/* -------------------------------------------- */

export type UseGetCustomerGroupReturn = CustomerGroup;
export type UseGetCustomerGroupParams = UseQueryParamsOption<UseGetCustomerGroupReturn>;

/* -------------------------------------------- */

export const useGetCustomerGroup = (id: string | null, options: UseGetCustomerGroupParams = {}) =>
  useQuery({
    queryKey: customerGroupQueryKey.detail(id!),
    queryFn: async () => {
      const response = await customerGroupApi.findById(id!);

      return mapCustomerGroup(response);
    },
    enabled: !!id,
    ...options,
  });
