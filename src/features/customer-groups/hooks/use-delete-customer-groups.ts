import type { UseCustomerGroupsReturn } from './use-customer-groups-query';

import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerGroupsService } from 'src/services';

import { customerGroupKeys } from '../api';

export const useDeleteCustomerGroups = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerGroupsService.deleteMany,
    onSuccess: (_, ids) => {
      queryClient.setQueriesData<{ id: string }>(
        { queryKey: customerGroupKeys.details, exact: false },
        (oldData) => {
          if (!oldData) return oldData;
          if (ids.includes(oldData.id)) {
            return undefined;
          }
          return oldData;
        }
      );

      queryClient.setQueriesData<UseCustomerGroupsReturn>(
        {
          queryKey: customerGroupKeys.lists,
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
        queryKey: customerGroupKeys.lists,
        exact: false,
        type: 'all',
      });

      toast.success('Xóa nhiều nhóm khách hàng thành công.');
    },
  });
};
