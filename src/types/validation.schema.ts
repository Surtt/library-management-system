import { z } from 'zod';

import { validationBookSchema } from '@/utils';
import { validationAuthorSchema } from '@/utils/author.validation';

export type TValidationBookSchema = z.infer<typeof validationBookSchema>;
export type TValidationAuthorSchema = z.infer<typeof validationAuthorSchema>;
