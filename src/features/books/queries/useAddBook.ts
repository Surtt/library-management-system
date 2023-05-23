import { useMutation } from '@tanstack/react-query';

import { addBook } from '@/features/books/api/addBook';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';
import { IBook } from '@/types';

export const useAddBook = () => {
  return useMutation((bookData: IBook) => addBook(bookData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
    },
  });
};
