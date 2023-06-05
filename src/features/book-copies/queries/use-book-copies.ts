import { useQuery } from '@tanstack/react-query';

import { getBookCopies } from '@/features/book-copies/api/get-book-copies';
import { queryKeys } from '@/queries/constants';

export const useBookCopies = () => {
  return useQuery([queryKeys.copies], getBookCopies);
};
