import type { UseCustomerGroupsReturn } from './use-customer-groups-query';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerGroupsService } from 'src/services';

import { customerGroupKeys } from '../api';

export const useDeleteCustomerGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerGroupsService.delete,
    onSuccess: (_, id) => {
      try {
        queryClient.setQueryData(customerGroupKeys.detail(id), undefined);

        queryClient.setQueriesData<UseCustomerGroupsReturn>(
          {
            queryKey: customerGroupKeys.lists,
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
          queryKey: customerGroupKeys.lists,
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
