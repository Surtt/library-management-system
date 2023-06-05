import { useMutation } from '@tanstack/react-query';

import { deleteAuthor } from '@/features/authors/api/delete-author';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';

export const useDeleteAuthor = () => {
  return useMutation((id: string) => deleteAuthor(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.authors] });
    },
  });
};
