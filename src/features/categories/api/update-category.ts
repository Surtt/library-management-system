import { api } from '@/api';
import { ICategory } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const updateCategory = async ({
  categoryId,
  newData,
}: {
  categoryId: ICategory['id'];
  newData: ICategory;
}) => {
  const { data } = await api.put<ICategory>(`/categories/${categoryId}`, newData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
