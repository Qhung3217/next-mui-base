import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerGroupApi, customerGroupQueryKey } from '../api';

export const useCreateCustomerGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerGroupApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: customerGroupQueryKey.lists,
        exact: false,
        type: 'all',
      });
      toast.success('Thêm nhóm khách hàng thành công.');
    },
  });
};
