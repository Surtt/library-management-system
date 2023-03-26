import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import Filter from '@/components/filter';
import { useAuthors } from '@/queries/useAuthors';
import { useBooks } from '@/queries/useBooks';
import { IBookFilter } from '@/types';

import Book from './book';

const Books = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState<IBookFilter>({
    available: false,
    author: '',
    publishedDate: '',
  });
  const [books, errorBooks] = useBooks({ filters });
  const [authors] = useAuthors();
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
        <Filter filters={filters} setFilter={setFilters} authors={authors} />
        {books.map((book) => (
          <Book key={book.title} {...book} />
        ))}
      </Box>
    </>
  );
};

export default Books;
