import { IAuthor } from '@/types/author';
import { ICategory } from '@/types/category';

import { TStatus } from './book-status';

export interface IBook {
  id: string;
  isbn: string;
  title: string;
  description: string;
  image: string;
  publisher: string;
  status: TStatus;
  publishedDate: string;
  quantity: number;
  category: ICategory['id'];
  authors: IAuthor[];
}

export interface IBookFilter {
  available: boolean;
  author: string;
}

export type TAddBook = Omit<
  IBook,
  'id' | 'status' | 'borrowDate' | 'borrowerId' | 'returnDate' | 'image' | 'publishedDate'
>;
