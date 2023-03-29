import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import VisitorsBook from '@/components/books/visitors-book';
import { useAppSelector } from '@/hooks/useAppSelector';

const DashboardPage = () => {
  const { users, books } = useAppSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.user) {
      navigate('/login');
    }
    if (users.user?.role && users.user?.role !== 'admin') {
      navigate('/');
    }
  }, [users.user]);
  return (
    <Box component="section">
      <Box component="h3">Dashboard</Box>
      <Box sx={{ display: 'flex', flex: '1 1 100%' }}>
        <Box sx={{ flexBasis: '30%' }}>
          <Link to="/add-book">Add a book</Link>
        </Box>
        <Box sx={{ flexBasis: '70%', display: 'flex', columnGap: 4, rowGap: 4, flexWrap: 'wrap' }}>
          {books.list.map((book) => (
            <VisitorsBook key={book.id} {...book} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
