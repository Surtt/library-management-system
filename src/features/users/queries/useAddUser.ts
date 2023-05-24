import { useMutation } from '@tanstack/react-query';

import { addUser } from '@/features/users/api/addUser';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';
import { IUser } from '@/types';

export const useAddUser = () => {
  return useMutation((userData: IUser) => addUser(userData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
    },
  });
};
