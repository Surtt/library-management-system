import { api } from '@/api';
import { IAuthor } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const addAuthor = async (authorData: { name: IAuthor['name'] }) => {
  const { data } = await api.post<IAuthor>('/authors', authorData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
