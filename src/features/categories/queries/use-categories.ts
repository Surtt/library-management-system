import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/features/categories/api/get-categories';
import { queryKeys } from '@/queries/constants';

export const useCategories = () => {
  return useQuery([queryKeys.categories], getCategories);
};
