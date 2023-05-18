import { IBookCopy } from '@/types/book-copy';
import { IUser } from '@/types/user';

export interface ICheckout {
  id: string;
  bookCopy: IBookCopy;
  user: IUser;
  borrowDate: Date;
  returnDate: Date | null;
  isReturned: boolean;
}
