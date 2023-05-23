import { api } from '@/api';
import { IBook } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const addBook = async (bookData: IBook) => {
  const { data } = await api.post<IBook>('/books', bookData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
