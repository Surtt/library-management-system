import { getBooks } from '@/features/books/booksApi';
import useData from '@/queries/hooks/useData';
import { IBook, IBookFilter } from '@/types';
import { setFilter } from '@/utils';

import { queryKeys } from './constants';

type UseBooksProps = {
  debouncedSearch?: string;
  filters?: IBookFilter;
};

export const useBooks = ({
  debouncedSearch,
  filters,
}: UseBooksProps): [IBook[], unknown, boolean, boolean, boolean] => {
  const [books, error, isLoading, isFetching, isError] = useData<IBook[]>(
    [queryKeys.books, debouncedSearch, filters],
    getBooks,
    (books: IBook[]) => setFilter(books, filters as IBookFilter),
  );
  // console.log(books, 'query');
  return [books, error, isLoading, isFetching, isError];
};
