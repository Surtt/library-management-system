import { useQuery } from '@tanstack/react-query';

import { getBookCopies } from '@/features/books/api/getBookCopies';
import { queryKeys } from '@/queries/constants';

export const useBookCopies = (bookId: string) => {
  return useQuery([queryKeys.copies, bookId], () => getBookCopies(bookId), { enabled: !!bookId });
};
