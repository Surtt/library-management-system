import { useMutation } from '@tanstack/react-query';

import { addUser } from '@/features/users/api/add-user';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';
import { IUser } from '@/types';

export const useAddUser = () => {
  return useMutation((userData: IUser) => addUser(userData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
    },
  });
};
