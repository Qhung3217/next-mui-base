import type { UseCustomerGroupsReturn } from './use-customer-groups-query';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerGroupsService } from 'src/services';

import { customerGroupKeys } from '../api';
import { mapCustomerGroup } from '../mappers';

export const useUpdateCustomerGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerGroupsService.update,
    onSuccess: (data) => {
      queryClient.setQueryData(customerGroupKeys.detail(data.id), mapCustomerGroup(data));
      queryClient.setQueriesData<UseCustomerGroupsReturn>(
        {
          queryKey: customerGroupKeys.lists,
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
