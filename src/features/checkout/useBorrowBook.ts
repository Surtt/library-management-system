import { useMutation } from '@tanstack/react-query';

import { borrowBook } from '@/features/checkout/checkoutApi';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';

export const useBorrowBook = () => {
  return useMutation(
    (returnData: { bookCopyId: string; userId: string | null | undefined }) =>
      borrowBook(returnData),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [queryKeys.books] });
      },
    },
  );
};
