import { useMutation } from '@tanstack/react-query';

import { deleteCategory } from '@/features/categories/api/deleteCategory';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';

export const useDeleteCategory = () => {
  return useMutation((id: string) => deleteCategory(id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
    },
  });
};
