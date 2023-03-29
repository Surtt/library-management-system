import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import VisitorsBook from '@/components/books/visitors-book';
import AddBookForm from '@/components/forms/add-book-form';
import { useAppSelector } from '@/hooks/useAppSelector';

const BooksPage = () => {
  const { books } = useAppSelector((state) => state);
  const [openBookForm, setOpenBookForm] = useState(false);

  const handleClickOpenBookForm = () => {
    setOpenBookForm(true);
  };

  const handleCloseBookForm = () => {
    setOpenBookForm(false);
  };
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
      <>
        <Button sx={{ width: '50%' }} variant="contained" onClick={handleClickOpenBookForm}>
          Add a book
        </Button>
        <AddBookForm open={openBookForm} handleClose={handleCloseBookForm} />
      </>
      <Box sx={{ display: 'flex', columnGap: 4, rowGap: 4, flexWrap: 'wrap' }}>
        {books.list.map((book) => (
          <VisitorsBook key={book.id} {...book} />
        ))}
      </Box>
    </Box>
  );
};

export default BooksPage;
