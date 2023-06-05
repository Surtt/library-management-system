import { api } from '@/api';
import { IBook } from '@/types';

export const getBookById = async (bookId: string | undefined) => {
  const { data } = await api.get<IBook>(`/books/${bookId}`);
  return data;
};
