import { IAuthor } from '@/types';

import { api } from './';

export const getAuthors = async () => {
  const { data } = await api.get<IAuthor[]>('authors.json');
  return data;
};
