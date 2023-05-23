import { useQuery } from '@tanstack/react-query';

import { getBookCopiesById } from '@/features/book-copies/api/getBookCopiesById';
import { queryKeys } from '@/queries/constants';

export const useBookCopiesById = (bookId: string) => {
  return useQuery([queryKeys.copies, bookId], () => getBookCopiesById(bookId), {
    enabled: !!bookId,
  });
};
