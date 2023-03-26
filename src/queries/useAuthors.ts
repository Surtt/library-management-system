import { getAuthors } from '@/api/authorsApi';
import { queryKeys } from '@/queries/constants';
import useData from '@/queries/hooks/useData';
import { IAuthor } from '@/types';

export const useAuthors = (): [IAuthor[], unknown, boolean, boolean, boolean] => {
  const [authors, error, isLoading, isFetching, isError] = useData<IAuthor[]>(
    [queryKeys.authors],
    getAuthors,
  );

  return [authors, error, isLoading, isFetching, isError];
};
