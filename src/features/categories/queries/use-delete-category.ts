import { useMutation } from '@tanstack/react-query';

import { deleteCategory } from '@/features/categories/api/delete-category';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/query-client';

export const useDeleteCategory = () => {
  return useMutation((id: string) => deleteCategory(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
    },
  });
};
