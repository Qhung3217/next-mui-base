import type { UseGetCustomerGroupsReturn } from './use-get-customer-groups';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { mapCustomerGroup } from '../data';
import { customerGroupApi, customerGroupQueryKey } from '../api';

export const useUpdateCustomerGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerGroupApi.update,
    onSuccess: (data) => {
      queryClient.setQueryData(customerGroupQueryKey.detail(data.id), mapCustomerGroup(data));
      queryClient.setQueriesData<UseGetCustomerGroupsReturn>(
        {
          queryKey: customerGroupQueryKey.lists,
          exact: false,
          type: 'all',
        },
        (oldData) => {
          if (!oldData) return oldData;

          const newList = [...oldData.list];
          const index = oldData?.list.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            newList.splice(index, 1, mapCustomerGroup(data));
            return {
              meta: oldData.meta,
              list: newList,
            };
          }
          return oldData;
        }
      );

      toast.success('Cập nhật nhóm khách hàng thành công.');
    },
  });
};
