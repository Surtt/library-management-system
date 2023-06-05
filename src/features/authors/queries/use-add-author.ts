import { useMutation } from '@tanstack/react-query';

import { addAuthor } from '@/features/authors/api/add-author';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';
import { IAuthor } from '@/types';

export const useAddAuthor = () => {
  return useMutation((authorData: { name: IAuthor['name'] }) => addAuthor(authorData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.authors] });
    },
  });
};
