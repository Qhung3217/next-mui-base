import type { CustomerGroup } from '../data';
import type { ApiResponseList, BaseReqSearchParams, UseQueryParamsOption } from 'src/types';

import { useQuery } from '@tanstack/react-query';

import { mapCustomerGroupList } from '../data';
import { customerGroupApi, customerGroupQueryKey } from '../api';

/* -------------------------------------------- */

export type UseGetCustomerGroupsReturn = ApiResponseList<CustomerGroup[]>;
export type UseGetCustomerGroupsParams = {
  searchParams: BaseReqSearchParams;
  options?: UseQueryParamsOption<UseGetCustomerGroupsReturn>;
};

/* -------------------------------------------- */

export const useGetCustomerGroups = (
  { searchParams, options }: UseGetCustomerGroupsParams = {
    searchParams: { page: 1, perPage: 10 },
  }
) =>
  useQuery({
    queryKey: customerGroupQueryKey.list(searchParams),
    queryFn: async () => {
      const response = await customerGroupApi.find(searchParams);

      return {
        list: mapCustomerGroupList(response.list),
        meta: response.meta,
      };
    },

    ...options,
  });
