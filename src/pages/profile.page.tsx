import React from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import VisitorsBook from '@/components/books/visitors-book';
import ButtonBack from '@/components/button-back';
import { useStateContext } from '@/context';
import { getUsersCheckouts } from '@/features/checkout/api/getUsersCheckouts';

const ProfilePage = () => {
  const user = useStateContext().state.authUser;
  const { data: checkouts } = useQuery({
    queryKey: ['checkouts'],
    queryFn: () => getUsersCheckouts(user?.id),
    enabled: !!user?.id,
  });

  return (
    <Box component="section">
      <ButtonBack />
      <Box component="h3">Borrowed books</Box>
      <Box sx={{ display: 'flex', columnGap: 4 }}>
        {checkouts
          ?.filter((checkout) => !checkout.isReturned)
          .map((checkout) => (
            <VisitorsBook key={checkout.id} {...checkout} />
          ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
