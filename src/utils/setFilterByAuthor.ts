import { IBook, IBookFilter } from '@/types';

export const setFilterByAuthor = (books: IBook[], filters: IBookFilter) =>
  books.filter((book) => (filters?.author ? book.authors === filters?.author : book));
