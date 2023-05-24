import { useMutation } from '@tanstack/react-query';

import { updateUser } from '@/features/users/api/updateUser';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';
import { IUser } from '@/types';

export const useUpdateUser = () => {
  return useMutation((params: { userId: IUser['id']; newData: IUser }) => updateUser(params), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
    },
  });
};
