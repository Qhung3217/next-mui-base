import type { CustomerGroup } from '../models';
import type { UseQueryParamsOption } from 'src/types';

import { useQuery } from '@tanstack/react-query';

import { customerGroupsService } from 'src/services';

import { customerGroupKeys } from '../api';
import { mapCustomerGroup } from '../mappers';

/* -------------------------------------------- */

export type UseCustomerGroupReturn = CustomerGroup;
export type UseCustomerGroupQueryParams = UseQueryParamsOption<UseCustomerGroupReturn>;

/* -------------------------------------------- */

export const useCustomerGroupQuery = (
  id: string | null,
  options: UseCustomerGroupQueryParams = {}
) =>
  useQuery({
    queryKey: customerGroupKeys.detail(id!),
    queryFn: async () => {
      const response = await customerGroupsService.findOne(id!);

      return mapCustomerGroup(response);
    },
    enabled: !!id,
    ...options,
  });
