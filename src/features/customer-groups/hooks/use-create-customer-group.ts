import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerGroupsService } from 'src/services';

import { customerGroupKeys } from '../api';

export const useCreateCustomerGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerGroupsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: customerGroupKeys.lists,
        exact: false,
        type: 'all',
      });
      toast.success('Thêm nhóm khách hàng thành công.');
    },
  });
};
