import { useQuery } from '@tanstack/react-query';

import { getBookById } from '@/features/books/api/getBookById';
import { queryKeys } from '@/queries/constants';

export const useBookById = (bookId: string) => {
  return useQuery([queryKeys.books, bookId], () => getBookById(bookId), { enabled: !!bookId });
};
