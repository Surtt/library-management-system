import { getUsers } from '@/api/usersApi';
import { queryKeys } from '@/queries/constants';
import useData from '@/queries/hooks/useData';
import { IUser } from '@/types';

export const useUsers = (): [IUser[], unknown, boolean, boolean, boolean] => {
  const [users, error, isLoading, isFetching, isError] = useData<IUser[]>(
    [queryKeys.users],
    getUsers,
  );

  return [users, error, isLoading, isFetching, isError];
};
