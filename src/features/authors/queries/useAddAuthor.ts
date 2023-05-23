import { useMutation } from '@tanstack/react-query';

import { addAuthor } from '@/features/authors/api/addAuthor';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';
import { IAuthor } from '@/types';

export const useAddAuthor = () => {
  return useMutation((authorData: { name: IAuthor['name'] }) => addAuthor(authorData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.authors] });
    },
  });
};
