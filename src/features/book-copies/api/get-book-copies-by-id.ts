import { api } from '@/api';
import { IBookCopy } from '@/types/book-copy';

export const getBookCopiesById = async (id: string) => {
  const { data } = await api.get<IBookCopy[]>(`/books/book-copy/book/${id}`);
  return data;
};
