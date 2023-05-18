import { useQuery } from '@tanstack/react-query';

import { getBookCopies } from '@/features/books/bookCopyApi';
import { queryKeys } from '@/queries/constants';

export const useBookCopies = (bookId: string) => {
  return useQuery([queryKeys.copies, bookId], () => getBookCopies(bookId), { enabled: !!bookId });
};

// const { data: bookCopies, refetch } = useQuery({
//   queryKey: ['copies'],
//   queryFn: () => getBookCopies(book.id),
//   enabled: !!book.id,
// });
