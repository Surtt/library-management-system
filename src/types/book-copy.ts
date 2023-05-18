import { IBook } from '@/types/book';

export interface IBookCopy {
  id: string;
  status: boolean;
  book: IBook;
}
