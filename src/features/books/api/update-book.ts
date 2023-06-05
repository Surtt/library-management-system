import { api } from '@/api';
import { IBook } from '@/types';
import { cookie } from '@/utils/cookieInstance';

export const updateBook = async ({
  bookId,
  newData,
}: {
  bookId: string;
  newData: Omit<IBook, 'id' | 'status' | 'quantity' | 'category' | 'authors'> & {
    authorId: string;
    categoryId: string;
  };
}) => {
  const { data } = await api.put<IBook>(`/books/${bookId}`, newData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
