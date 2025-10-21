import type { CustomerGroup } from '../models';
import type { ApiResponseList, BaseReqSearchParams, UseQueryParamsOption } from 'src/types';

import { useQuery } from '@tanstack/react-query';

import { customerGroupsService } from 'src/services';

import { customerGroupKeys } from '../api';
import { mapCustomerGroupList } from '../mappers';

/* -------------------------------------------- */

export type UseCustomerGroupsReturn = ApiResponseList<CustomerGroup[]>;
export type UseCustomerGroupsQueryParams = {
  searchParams: BaseReqSearchParams;
  options?: UseQueryParamsOption<UseCustomerGroupsReturn>;
};

/* -------------------------------------------- */

export const useCustomerGroupsQuery = (
  { searchParams, options }: UseCustomerGroupsQueryParams = {
    searchParams: { page: 1, perPage: 10 },
  }
) =>
  useQuery({
    queryKey: customerGroupKeys.list(searchParams),
    queryFn: async () => {
      const response = await customerGroupsService.findMany(searchParams);

      return {
        list: mapCustomerGroupList(response.list),
        meta: response.meta,
      };
    },

    ...options,
  });
