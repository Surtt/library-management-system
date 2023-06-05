import { api } from '@/api';
import { ICategory } from '@/types';

export const getCategoryById = async (categoryId: string) => {
  const { data } = await api.get<ICategory>(`/categories/${categoryId}`);
  return data;
};
