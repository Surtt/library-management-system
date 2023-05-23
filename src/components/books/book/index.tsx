import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStateContext } from '@/context';
import { useBookCopies } from '@/features/books/queries/useBookCopies';
import { useBorrowBook } from '@/features/checkout/useBorrowBook';
import { IBook } from '@/types';

const Book = (book: IBook) => {
  const { data: bookCopies, refetch } = useBookCopies(book.id);
  const { mutate } = useBorrowBook();

  const navigate = useNavigate();
  const user = useStateContext().state.authUser;
  const location = useLocation();

  const handleBorrowBook = () => {
    if (!user) {
      navigate('/signin', { state: location.pathname });
    }

    refetch();
    const bookCopyId = bookCopies?.find((bookCopy) => bookCopy.status)?.id as string;
    mutate({ bookCopyId, userId: user?.id });
  };

  return (
    <Card
      sx={{
        justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia sx={{ height: 250 }} image={book.image} title={book.title} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {book.title}
        </Typography>
        {book.authors.map(({ id, name }) => (
          <Typography gutterBottom key={id} variant="subtitle2">
            by {name}
          </Typography>
        ))}
        <Typography variant="subtitle2">Available: {book.quantity} copies</Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button
          onClick={handleBorrowBook}
          variant="outlined"
          color="inherit"
          fullWidth
          disabled={!book.status}
        >
          {book.status ? 'Borrow' : 'Not available'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Book;
