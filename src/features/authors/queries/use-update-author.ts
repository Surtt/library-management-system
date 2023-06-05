import { useMutation } from '@tanstack/react-query';

import { updateAuthor } from '@/features/authors/api/update-author';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';
import { IAuthor } from '@/types';

export const useUpdateAuthor = () => {
  return useMutation(
    (params: { authorId: IAuthor['id']; newData: IAuthor }) => updateAuthor(params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [queryKeys.authors] });
      },
    },
  );
};
