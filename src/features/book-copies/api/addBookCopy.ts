import { api } from '@/api';
import { IBookCopy } from '@/types/book-copy';
import { cookie } from '@/utils/cookieInstance';

export const addBookCopy = async (copyData: { bookId: string }) => {
  const { data } = await api.post<IBookCopy>('/books/book-copy', copyData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
