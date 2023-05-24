import React from 'react';
import { Box } from '@mui/material';

import VisitorsBook from '@/components/books/visitors-book';
import { useStateContext } from '@/context';
import { useCheckoutsByUserId } from '@/features/checkout/queries/useCheckoutsById';

const ProfilePage = () => {
  const user = useStateContext().state.authUser;
  const { data: checkouts = [], refetch } = useCheckoutsByUserId(user?.id);
  refetch();
  return (
    <Box component="section">
      <Box component="h3">Borrowed books</Box>
      <Box sx={{ display: 'flex', columnGap: 4 }}>
        {checkouts
          ?.filter((checkout) => !checkout.isReturned)
          .map((checkout) => {
            // refetch();
            return <VisitorsBook key={checkout.id} {...checkout} />;
          })}
      </Box>
    </Box>
  );
};

export default ProfilePage;
