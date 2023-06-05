import { useQuery } from '@tanstack/react-query';

import { getCategoryById } from '@/features/categories/api/get-category-by-id';
import { queryKeys } from '@/queries/constants';

export const useCategoryById = (categoryId: string) => {
  return useQuery([queryKeys.categories, categoryId], () => getCategoryById(categoryId), {
    enabled: !!categoryId,
  });
};
