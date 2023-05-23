import { useQuery } from '@tanstack/react-query';

import { getAuthors } from '@/features/authors/api/getAuthors';
import { queryKeys } from '@/queries/constants';

export const useAuthors = () => {
  return useQuery([queryKeys.authors], getAuthors);
};
