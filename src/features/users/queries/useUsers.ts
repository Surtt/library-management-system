import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@/features/users/api/getUsers';
import { queryKeys } from '@/queries/constants';

export const useUsers = () => {
  return useQuery([queryKeys.users], getUsers);
};
