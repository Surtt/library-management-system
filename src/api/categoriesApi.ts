import { ICategory } from '@/types';

import { api } from './index';

export const getCategories = async () => {
  const { data } = await api.get<ICategory[]>('categories.json');
  return data;
};
