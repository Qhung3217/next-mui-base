import type { UseCustomersReturn } from './use-customers-query';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customersService } from 'src/services';

import { customerKeys } from '../api';
import { mapCustomer } from '../mappers';

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customersService.update,
    onSuccess: (data) => {
      queryClient.setQueryData(customerKeys.detail(data.id), mapCustomer(data));
      queryClient.setQueriesData<UseCustomersReturn>(
        {
          queryKey: customerKeys.lists,
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
