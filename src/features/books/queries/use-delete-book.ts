import { useMutation } from '@tanstack/react-query';

import { deleteBook } from '@/features/books/api/delete-book';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';

export const useDeleteBook = () => {
  return useMutation((id: string) => deleteBook(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
