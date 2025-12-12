import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customerApi, customerQueryKey } from '../api';

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: customerQueryKey.lists,
        exact: false,
        type: 'all',
      });
      toast.success('Thêm khách hàng thành công.');
    },
  });
};
