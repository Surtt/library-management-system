import { IBook, IBookFilter } from '@/types';

export const setFilterByAvailable = (books: IBook[], filters: IBookFilter) =>
  books.filter((book) => (filters?.available ? book.status === 'available' : book));
