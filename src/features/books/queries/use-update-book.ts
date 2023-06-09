import { useMutation } from '@tanstack/react-query';

import { updateBook } from '@/features/books/api/update-book';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';
import { IBook } from '@/types';

export const useUpdateBook = () => {
  return useMutation(
    (params: {
      bookId: string;
      newData: Omit<IBook, 'id' | 'status' | 'quantity' | 'category' | 'authors'> & {
        authorId: string;
        categoryId: string;
      };
    }) => updateBook(params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
      },
    },
  );
};
