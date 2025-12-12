import type { UseGetCustomerGroupsReturn } from './use-get-customer-groups';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerGroupApi, customerGroupQueryKey } from '../api';

export const useDeleteCustomerGroups = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerGroupApi.deleteMany,
    onSuccess: (_, ids) => {
      queryClient.setQueriesData<{ id: string }>(
        { queryKey: customerGroupQueryKey.details, exact: false },
        (oldData) => {
          if (!oldData) return oldData;
          if (ids.includes(oldData.id)) {
            return undefined;
          }
          return oldData;
        }
      );

      queryClient.setQueriesData<UseGetCustomerGroupsReturn>(
        {
          queryKey: customerGroupQueryKey.lists,
          exact: false,
          type: 'all',
        },
        (oldData) => {
          if (!oldData) return oldData;

          const newList = [...oldData.list];
          ids.forEach((id) => {
            const index = oldData?.list.findIndex((item) => item.id === id);
            if (index !== -1) {
              newList.splice(index, 1);
            }
          });

          return {
            meta: oldData.meta,
            list: newList,
          };
        }
      );

      queryClient.invalidateQueries({
        queryKey: customerGroupQueryKey.lists,
        exact: false,
        type: 'all',
      });

      toast.success('Xóa nhiều nhóm khách hàng thành công.');
    },
  });
};
