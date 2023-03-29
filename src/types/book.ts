import { ICategory } from '@/types/category';

import { TStatus } from './book-status';

export interface IBook {
  id: string;
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  authors: string;
  status: TStatus;
  borrowerId: string | null;
  publishedDate: string;
  borrowDate: string | null;
  returnDate: string | null;
  image: string;
  categories: ICategory['id'][];
}

export interface IBookFilter {
  available: boolean;
  author: string;
  publishedDate: string;
}

export type TAddBook = Omit<
  IBook,
  'id' | 'status' | 'borrowDate' | 'borrowerId' | 'returnDate' | 'image' | 'publishedDate'
>;
