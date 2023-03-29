import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import VisitorsBook from '@/components/books/visitors-book';
import AddBookForm from '@/components/forms/add-book-form';
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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box component="section">
      <Box component="h3">Dashboard</Box>
      <Button onClick={handleBack}>Back</Button>
      <Box sx={{ display: 'flex', flex: '1 1 100%' }}>
        <Box sx={{ flexBasis: '30%' }}>
          <Button onClick={handleClickOpen}>Add a book</Button>
          <AddBookForm open={open} handleClose={handleClose} />
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
