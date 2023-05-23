import { api } from '@/api';
import { IBook } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const deleteBook = async (bookId: IBook['id']) => {
  const { data } = await api.delete<IBook>(`books/${bookId}`, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
