import { useQuery } from '@tanstack/react-query';

import { getBookCopiesById } from '@/features/book-copies/api/get-book-copies-by-id';
import { queryKeys } from '@/queries/constants';

export const useBookCopiesById = (bookId: string) => {
  return useQuery([queryKeys.copies, bookId], () => getBookCopiesById(bookId), {
    enabled: !!bookId,
  });
};
