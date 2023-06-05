import { useMutation } from '@tanstack/react-query';

import { deleteBookCopy } from '@/features/book-copies/api/delete-book-copy';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';

export const useDeleteBookCopy = () => {
  return useMutation((id: string) => deleteBookCopy(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.copies] });
    },
  });
};
