import type { UseCustomersReturn } from './use-get-customers';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerApi, customerQueryKey } from '../api';

export const useDeleteCustomers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerApi.deleteMany,
    onSuccess: (_, ids) => {
      queryClient.setQueriesData<{ id: string }>(
        { queryKey: customerQueryKey.details, exact: false },
        (oldData) => {
          if (!oldData) return oldData;
          if (ids.includes(oldData.id)) {
            return undefined;
          }
          return oldData;
        }
      );

      queryClient.setQueriesData<UseCustomersReturn>(
        {
          queryKey: customerQueryKey.lists,
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
        queryKey: customerQueryKey.lists,
        exact: false,
        type: 'all',
      });

      toast.success('Xóa nhiều khách hàng thành công.');
    },
  });
};
