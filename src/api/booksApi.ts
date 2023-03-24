import { IBook } from '@/types';

import { api } from './index';

export const getBooks = async () => {
  const { data } = await api.get<IBook[]>('books.json');
  return data;
};
