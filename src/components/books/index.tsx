import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { getBooksThunk } from '@/features/books/booksSlice';
import { useAppDispatch } from '@/hooks';
import { useBooks } from '@/queries/useBooks';

import Book from './book';

const Books = () => {
  const [books] = useBooks({});
  const dispatch = useAppDispatch();
  // const { books, filters } = useAppSelector((state) => state);

  // const shouldRender = () => setFilter(books.list, filters.filter);

  useEffect(() => {
    dispatch(getBooksThunk());
  }, [dispatch]);

  return (
    <>
      {/*{errorBooks && <ToastContainer />}*/}
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
          <Book key={book.id} {...book} />
        ))}
      </Box>
    </>
  );
};

export default Books;
