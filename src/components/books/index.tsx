import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useBooks } from '@/features/books/queries/useBooks';
import { useCategories } from '@/features/categories/queries/useCategories';

import Book from './book';

const Books = () => {
  const { category } = useParams();
  const { data: books = [] } = useBooks();
  const { data: categories } = useCategories();
  const categoryId = categories?.find((c) => c?.name.toLowerCase() === category)?.id;

  const renderAllBooks = () => (
    <>
      {books?.map((book) => (
        <Book key={book.id} {...book} />
      ))}
    </>
  );

  const renderBooksByCategory = () => (
    <>
      {books
        ?.filter((book) => book.category === categoryId)
        .map((book) => (
          <Book key={book.id} {...book} />
        ))}
    </>
  );

  return (
    <>
      <Box
        component="section"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'auto',
          gridGap: 20,
        }}
      >
        {!category ? renderAllBooks() : renderBooksByCategory()}
      </Box>
    </>
  );
};

export default Books;
