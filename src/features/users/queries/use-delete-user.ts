import { useMutation } from '@tanstack/react-query';

import { deleteUser } from '@/features/users/api/delete-user';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';

export const useDeleteUser = () => {
  return useMutation((userId: string) => deleteUser(userId), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
    },
  });
};
