import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/button';
import { useStateContext } from '@/context';
import { useBookCopiesById } from '@/features/book-copies/queries/useBookCopiesById';
import { useBorrowBook } from '@/features/checkout/queries/useBorrowBook';
import { IBook } from '@/types';

const Book = (book: IBook) => {
  const theme = useTheme();
  const { data: bookCopies, refetch } = useBookCopiesById(book.id as string);
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
      <Link to={`/books/${book.id}`} state={{ previousLocation: location }}>
        <CardMedia sx={{ height: 250 }} image={book.image} title={book.title} />
        <CardContent>
          <Typography gutterBottom variant="h6" color={theme.palette.grey['800']}>
            {book.title}
          </Typography>
          {book.authors?.map(({ id, name }) => (
            <Typography gutterBottom key={id} variant="subtitle2" color={theme.palette.grey['800']}>
              by {name}
            </Typography>
          ))}
          <Typography variant="subtitle2" color={theme.palette.grey['800']}>
            Available: {book.quantity} copies
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button onClick={handleBorrowBook} variant="outlined" fullWidth disabled={!book.status}>
          {book.status ? 'Borrow' : 'Not available'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Book;
