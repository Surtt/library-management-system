import { useMutation } from '@tanstack/react-query';

import { returnBook } from '@/features/checkout/api/retutnBook';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';

export const useReturnBook = (id: string) => {
  return useMutation(
    (returnData: { bookCopyId: string; userId: string | null | undefined }) =>
      returnBook(id, returnData),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [queryKeys.checkouts] });
        await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
      },
    },
  );
};
