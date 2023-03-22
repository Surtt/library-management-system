import { TStatus } from './book-status';

export interface IBook {
  ISBN: string;
  title: string;
  description: string;
  publisher: string;
  authors: string;
  status: TStatus;
  borrowerId: string;
  publishedDate: string;
  borrowDate: string;
  returnDate: string;
  image: string;
  category: string;
}
