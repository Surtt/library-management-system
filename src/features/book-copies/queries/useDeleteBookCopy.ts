import { useMutation } from '@tanstack/react-query';

import { deleteBookCopy } from '@/features/book-copies/api/deleteBookCopy';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';

export const useDeleteBookCopy = () => {
  return useMutation((id: string) => deleteBookCopy(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
      await queryClient.invalidateQueries({ queryKey: [queryKeys.copies] });
    },
  });
};
