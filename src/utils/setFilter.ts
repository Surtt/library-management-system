import { IBook, IBookFilter } from '@/types';
import { setFilterByAuthor } from '@/utils/setFilterByAuthor';
import { setFilterByAvailable } from '@/utils/setFilterByAvailable';

export const setFilter = (books: IBook[], filters: IBookFilter) => {
  if (filters?.available && filters?.author) {
    const author = setFilterByAuthor(books, filters);
    return setFilterByAvailable(author, filters);
  } else if (filters?.available) {
    return setFilterByAvailable(books, filters);
  } else if (filters?.author) {
    return setFilterByAuthor(books, filters);
  } else {
    return books;
  }
};
