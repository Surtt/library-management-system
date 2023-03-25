import React from 'react';
import { Box, useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { useBooks } from '@/queries/useBooks';

import Book from './book';

const Books = () => {
  const theme = useTheme();
  const [books, errorBooks] = useBooks();
  return (
    <>
      {errorBooks && <ToastContainer />}
      <Box
        component="section"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginTop: 10,
          rowGap: 2,
          padding: 2.5,
          backgroundColor: theme.palette.common.white,
          borderRadius: 2,
        }}
      >
        {books.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </Box>
    </>
  );
};

export default Books;
