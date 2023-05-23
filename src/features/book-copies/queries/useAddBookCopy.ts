import { useMutation } from '@tanstack/react-query';

import { addBookCopy } from '@/features/book-copies/api/addBookCopy';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';

export const useAddBookCopy = () => {
  return useMutation((copyData: { bookId: string }) => addBookCopy(copyData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.copies] });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
