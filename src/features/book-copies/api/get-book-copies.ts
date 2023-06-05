import { api } from '@/api';
import { IBookCopy } from '@/types/book-copy';

export const getBookCopies = async () => {
  const { data } = await api.get<IBookCopy[]>('/books/book-copy');
  return data;
};
