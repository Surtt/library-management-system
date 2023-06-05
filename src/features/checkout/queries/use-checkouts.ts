import { useQuery } from '@tanstack/react-query';

import { getCheckouts } from '@/features/checkout/api/get-checkouts';
import { queryKeys } from '@/queries/constants';

export const useCheckouts = () => {
  return useQuery([queryKeys.checkouts], getCheckouts);
};
