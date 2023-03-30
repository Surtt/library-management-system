import { ICategory } from '@/types';

import { api } from './';

export const getCategories = async () => {
  const { data } = await api.get<ICategory[]>('categories.json');
  return data;
};
