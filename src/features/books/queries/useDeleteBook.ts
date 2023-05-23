import { useMutation } from '@tanstack/react-query';

import { deleteBook } from '@/features/books/api/deleteBook';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';

export const useDeleteBook = () => {
  return useMutation((id: string) => deleteBook(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
