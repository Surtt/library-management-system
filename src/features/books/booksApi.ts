import { api } from '@/api';
import { IBook } from '@/types';

export const getBooks = async () => {
  const { data } = await api.get<IBook[]>('/books');
  return data;
};
