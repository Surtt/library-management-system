import { useMutation } from '@tanstack/react-query';

import { deleteAuthor } from '@/features/authors/api/deleteAuthor';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';

export const useDeleteAuthor = () => {
  return useMutation((id: string) => deleteAuthor(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.authors] });
    },
  });
};
