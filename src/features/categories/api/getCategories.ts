import { api } from '@/api';
import { ICategory } from '@/types';

export const getCategories = async () => {
  const { data } = await api.get<ICategory[]>('/categories');
  return data;
};
