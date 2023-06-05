import { useMutation } from '@tanstack/react-query';

import { addBook } from '@/features/books/api/add-book';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';
import { IBook } from '@/types';

export const useAddBook = () => {
  return useMutation((bookData: IBook) => addBook(bookData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
