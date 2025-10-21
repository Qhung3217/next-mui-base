import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customersService } from 'src/services';

import { customerKeys } from '../api';

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: customerKeys.lists,
        exact: false,
        type: 'all',
      });
      toast.success('Thêm khách hàng thành công.');
    },
  });
};
