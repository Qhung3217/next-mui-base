import type { UseGetCustomerGroupsReturn } from './use-get-customer-groups';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerGroupApi, customerGroupQueryKey } from '../api';

export const useDeleteCustomerGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerGroupApi.delete,
    onSuccess: (_, id) => {
      try {
        queryClient.setQueryData(customerGroupQueryKey.detail(id), undefined);

        queryClient.setQueriesData<UseGetCustomerGroupsReturn>(
          {
            queryKey: customerGroupQueryKey.lists,
            exact: false,
            type: 'all',
          },
          (oldData) => {
            if (!oldData) return oldData;

            const newList = [...oldData.list];
            const index = oldData?.list.findIndex((item) => item.id === id);
            if (index !== -1) {
              newList.splice(index, 1);
              return {
                meta: oldData.meta,
                list: newList,
              };
            }
            return oldData;
          }
        );

        queryClient.invalidateQueries({
          queryKey: customerGroupQueryKey.lists,
          exact: false,
          type: 'all',
        });

        toast.success('Xóa nhóm khách hàng thành công.');
      } catch (error) {
        console.log('🚀 ~ useDeleteCustomerGroup ~ error:', error);
      }
    },
  });
};
