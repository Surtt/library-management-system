import React from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { useBooks } from '@/queries/useBooks';
import { IBookFilter } from '@/types';

import Book from './book';

type BooksProps = {
  filters: IBookFilter;
};

const Books = ({ filters }: BooksProps) => {
  const [books, errorBooks] = useBooks({ filters });

  return (
    <>
      {errorBooks && <ToastContainer />}
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: 1.5,
          rowGap: 2,
          marginTop: 5,
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
