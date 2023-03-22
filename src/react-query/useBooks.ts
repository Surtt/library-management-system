import { useQuery } from '@tanstack/react-query';

import { getBooks } from '../api/booksApi';
import { IBook } from '../types';

import { queryKeys } from './constants';

export const useBooks = (): [IBook[], unknown, boolean, boolean, boolean] => {
  const {
    data: books = [],
    error,
    isLoading,
    isFetching,
    isError,
  } = useQuery({ queryKey: [queryKeys.books], queryFn: getBooks });

  return [books, error, isLoading, isFetching, isError];
};
