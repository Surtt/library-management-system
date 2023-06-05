import { useMutation } from '@tanstack/react-query';

import { updateUser } from '@/features/users/api/update-user';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';
import { IUser } from '@/types';

export const useUpdateUser = () => {
  return useMutation((params: { userId: IUser['id']; newData: IUser }) => updateUser(params), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
    },
  });
};
