import { getBooks } from '@/api/booksApi';
import useData from '@/queries/hooks/useData';
import { IBook } from '@/types';

import { queryKeys } from './constants';

export const useBooks = (): [IBook[], unknown, boolean, boolean, boolean] => {
  // const {
  //   data: books = [],
  //   error,
  //   isLoading,
  //   isFetching,
  //   isError,
  // } = useQuery({ queryKey: [queryKeys.books], queryFn: getBooks });
  //
  // return [books, error, isLoading, isFetching, isError];
  const [books, error, isLoading, isFetching, isError] = useData<IBook[]>(
    [queryKeys.books],
    getBooks,
  );

  return [books, error, isLoading, isFetching, isError];
};
