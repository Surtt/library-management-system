import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useBooks } from '@/queries/useBooks';
import { useCategories } from '@/queries/useCategories';

import Book from './book';

const Books = () => {
  const { category } = useParams();
  const [books] = useBooks({});
  const [categories] = useCategories();
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
          display: 'flex',
          // flexWrap: 'wrap',
          columnGap: 1.5,
          rowGap: 2,
        }}
      >
        {!category ? renderAllBooks() : renderBooksByCategory()}
      </Box>
    </>
  );
};

export default Books;
