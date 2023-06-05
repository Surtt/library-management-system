import { api } from '@/api';
import { IAuthor } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const getAuthors = async () => {
  const { data } = await api.get<IAuthor[]>('authors', {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
