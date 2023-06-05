import { api } from '@/api';
import { ICategory } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const addCategory = async (categoryData: { name: ICategory['name'] }) => {
  const { data } = await api.post<ICategory>('/categories', categoryData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
