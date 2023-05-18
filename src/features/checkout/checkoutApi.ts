import { api } from '@/api';
import { IUser } from '@/types';
import { IBookCopy } from '@/types/book-copy';
import { ICheckout } from '@/types/checkout';
import { cookie } from '@/utils/cookieInstance';

export const borrowBook = async (borrowData: {
  bookCopyId: IBookCopy['id'];
  userId: IUser['id'];
}) => {
  const { data } = await api.post<ICheckout>('/books/borrow', borrowData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
