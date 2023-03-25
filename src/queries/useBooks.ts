import { getBooks } from '@/api/booksApi';
import useData from '@/queries/hooks/useData';
import { IBook } from '@/types';

import { queryKeys } from './constants';

type UseBooksProps = {
  debouncedSearch?: string;
};

export const useBooks = (
  debouncedSearch?: UseBooksProps,
): [IBook[], unknown, boolean, boolean, boolean] => {
  const [books, error, isLoading, isFetching, isError] = useData<IBook[]>(
    [queryKeys.books, debouncedSearch],
    getBooks,
  );

  return [books, error, isLoading, isFetching, isError];
};
