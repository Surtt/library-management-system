import { api } from '@/api';
import { ICategory } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const deleteCategory = async (categoryId: ICategory['id']) => {
  const { data } = await api.delete<ICategory[]>(`categories/${categoryId}`, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
