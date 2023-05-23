import { useQuery } from '@tanstack/react-query';

import { getBookCopies } from '@/features/book-copies/api/getBookCopies';
import { queryKeys } from '@/queries/constants';

export const useBookCopies = () => {
  return useQuery([queryKeys.copies], getBookCopies);
};
