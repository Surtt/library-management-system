import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { returnBookThunk } from '@/features/books/booksSlice';
import { userReturnBookThunk } from '@/features/users/usersSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IBook } from '@/types';

const VisitorsBook = ({ ISBN, title, image, status }: IBook) => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state);
  const currentBook = books.list.find((book) => book.ISBN === ISBN) as IBook;
  const handleReturnBook = () => {
    if (currentBook) {
      dispatch(returnBookThunk(currentBook.id));
      dispatch(userReturnBookThunk(currentBook.id));
    }
  };
  return (
    <Card sx={{ width: 175, display: 'flex', flexDirection: 'column' }}>
      <CardMedia sx={{ height: 250 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="h3">
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button onClick={handleReturnBook} variant="outlined" color="inherit" fullWidth>
          {status === 'borrowed' && 'Return'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default VisitorsBook;
