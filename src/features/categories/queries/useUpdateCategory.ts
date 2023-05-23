import { useMutation } from '@tanstack/react-query';

import { updateCategory } from '@/features/categories/api/updateCategory';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';
import { ICategory } from '@/types';

export const useUpdateCategory = () => {
  return useMutation(
    (params: { categoryId: ICategory['id']; newData: ICategory }) => updateCategory(params),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
      },
    },
  );
};
