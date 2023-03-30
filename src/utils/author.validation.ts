import { z } from 'zod';

export const validationAuthorSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});
