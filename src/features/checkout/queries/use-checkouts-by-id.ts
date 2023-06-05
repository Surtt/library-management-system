import { useQuery } from '@tanstack/react-query';

import { getUsersCheckouts } from '@/features/checkout/api/get-users-checkouts';
import { queryKeys } from '@/queries/constants';

export const useCheckoutsByUserId = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: [queryKeys.checkouts, userId],
    queryFn: () => getUsersCheckouts(userId),
    enabled: !!userId,
  });
};
