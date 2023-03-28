import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { getBooksThunk } from '@/features/books/booksSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IBook, IBookFilter } from '@/types';

import Book from './book';

type BooksProps = {
  filters: IBookFilter;
  books: IBook[];
  errorBooks: unknown;
};

const Books = ({ errorBooks }: BooksProps) => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(getBooksThunk());
  }, [dispatch]);

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
        {books.list.map((book) => (
          <Book key={book.id} {...book} />
        ))}
      </Box>
    </>
  );
};

export default Books;
