import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import VisitorsBook from '@/components/books/visitors-book';
import { useAppSelector } from '@/hooks/useAppSelector';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { books, users } = useAppSelector((state) => state);
  const borrowedBooks =
    users.user?.booksIds &&
    users?.user?.booksIds.flatMap((id) => books.list.filter((book) => book.id === id));

  useEffect(() => {
    if (!users.user) {
      return navigate('/login');
    }
  });

  return (
    <Box component="section">
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Box component="h3">Borrowed books</Box>
      <Box sx={{ display: 'flex', columnGap: 4 }}>
        {borrowedBooks?.map((book) => (
          <VisitorsBook key={book.id} {...book} />
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
