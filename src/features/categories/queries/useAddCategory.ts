import { useMutation } from '@tanstack/react-query';

import { addCategory } from '@/features/categories/api/addCategory';
import { queryKeys } from '@/queries/constants';
import { queryClient } from '@/queries/queryClient';
import { ICategory } from '@/types';

export const useAddCategory = () => {
  return useMutation((categoryData: { name: ICategory['name'] }) => addCategory(categoryData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.categories] });
    },
  });
};
