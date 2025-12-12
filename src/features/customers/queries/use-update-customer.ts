import type { UseCustomersReturn } from './use-get-customers';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { mapCustomer } from '../data';
import { customerApi, customerQueryKey } from '../api';

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerApi.update,
    onSuccess: (data) => {
      queryClient.setQueryData(customerQueryKey.detail(data.id), mapCustomer(data));
      queryClient.setQueriesData<UseCustomersReturn>(
        {
          queryKey: customerQueryKey.lists,
          exact: false,
          type: 'all',
        },
        (oldData) => {
          if (!oldData) return oldData;

          const newList = [...oldData.list];
          const index = oldData?.list.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            newList.splice(index, 1, mapCustomer(data));
            return {
              meta: oldData.meta,
              list: newList,
            };
          }
          return oldData;
        }
      );

      toast.success('Cập nhật khách hàng thành công.');
    },
  });
};
