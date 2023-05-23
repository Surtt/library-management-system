import { useQuery } from '@tanstack/react-query';

import { getBooks } from '@/features/books/api/getBooks';
import { queryKeys } from '@/queries/constants';

// type UseBooksProps = {
//   debouncedSearch?: string;
//   // filters?: IBookFilter;
// };

export const useBooks = (/*{ debouncedSearch, filters }: UseBooksProps*/) => {
  return useQuery(
    [queryKeys.books /*, debouncedSearch, filters*/],
    getBooks,
    // (books: IBook[]) => setFilter(books, filters as IBookFilter),
  );
};
