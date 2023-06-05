import { api } from '@/api';
import { IAuthor } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const deleteAuthor = async (authorId: string) => {
  const { data } = await api.delete<IAuthor[]>(`authors/${authorId}`, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
