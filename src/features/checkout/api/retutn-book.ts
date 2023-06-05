import { api } from '@/api';
import { IUser } from '@/types';
import { IBookCopy } from '@/types/book-copy';
import { ICheckout } from '@/types/checkout';
import { cookie } from '@/utils/cookieInstance';

export const returnBook = async (
  checkoutId: string,
  returnData: {
    bookCopyId: IBookCopy['id'];
    userId: IUser['id'];
  },
) => {
  const { data } = await api.put<ICheckout>(`/books/return/${checkoutId}`, returnData, {
    headers: { Authorization: `Bearer ${cookie.get('logged_in')}` },
  });
  return data;
};
