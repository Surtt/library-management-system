import { z } from 'zod';

export const validationBookSchema = z.object({
  ISBN: z.string().length(11, { message: 'ISBN must be 11 characters long' }),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  publisher: z.string().min(1, { message: 'Publisher is required' }),
  authors: z.string().min(1, { message: 'Authors is required' }),
  categories: z.string().array().min(1, { message: 'Categories is required' }),
});
