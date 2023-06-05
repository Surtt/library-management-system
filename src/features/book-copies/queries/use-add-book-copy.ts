import { useMutation } from '@tanstack/react-query';

import { addBookCopy } from '@/features/book-copies/api/add-book-copy';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';

export const useAddBookCopy = () => {
  return useMutation((copyData: { bookId: string }) => addBookCopy(copyData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.copies] });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
