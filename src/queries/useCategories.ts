import { getCategories } from '@/api/categoriesApi';
import { queryKeys } from '@/queries/constants';
import useData from '@/queries/hooks/useData';
import { ICategory } from '@/types';

export const useCategories = (): [ICategory[], unknown, boolean, boolean, boolean] => {
  const [categories, error, isLoading, isFetching, isError] = useData<ICategory[]>(
    [queryKeys.categories],
    getCategories,
  );

  return [categories, error, isLoading, isFetching, isError];
};
