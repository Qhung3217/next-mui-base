import type { UseCustomersReturn } from './use-get-customers';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerApi, customerQueryKey } from '../api';

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerApi.delete,
    onSuccess: (_, id) => {
      try {
        queryClient.setQueryData(customerQueryKey.detail(id), undefined);

        queryClient.setQueriesData<UseCustomersReturn>(
          {
            queryKey: customerQueryKey.lists,
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
          queryKey: customerQueryKey.lists,
          exact: false,
          type: 'all',
        });

        toast.success('Xóa khách hàng thành công.');
      } catch (error) {
        console.log('🚀 ~ useDeleteCustomer ~ error:', error);
      }
    },
  });
};
