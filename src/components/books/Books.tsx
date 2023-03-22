import React from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { useBooks } from '../../react-query/useBooks';

import Book from './Book';

const Books = () => {
  const [books, error] = useBooks();
  return (
    <>
      {error && <ToastContainer />}
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
