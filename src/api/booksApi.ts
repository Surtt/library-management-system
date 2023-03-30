import { IBook } from '@/types';

import { api } from './';

export const getBooks = async () => {
  const { data } = await api.get<IBook[]>('books.json');
  return data;
};
