import { useQuery } from '@tanstack/react-query';

import { getBookById } from '@/features/books/api/get-book-by-id';

export const useBookById = (bookId: string | undefined) => {
  return useQuery(['book', bookId], () => getBookById(bookId), { enabled: !!bookId });
};
