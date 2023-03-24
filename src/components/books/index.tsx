import React from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { useBooks } from '@/queries/useBooks';

import Book from './book';

const Books = () => {
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
