import { api } from '@/api';
import { IBookCopy } from '@/types/book-copy';
import { cookie } from '@/utils/cookieInstance';

export const deleteBookCopy = async (bookCopyId: IBookCopy['id']) => {
  const { data } = await api.delete<IBookCopy>(`books/book-copy/${bookCopyId}`, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
