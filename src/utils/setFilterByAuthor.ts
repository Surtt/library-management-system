import { IBook, IBookFilter } from '@/types';

export const setFilterByAuthor = (books: IBook[], filters: IBookFilter) =>
  books.filter(() => filters?.author /* ? book.authors == filters?.author : book*/);
