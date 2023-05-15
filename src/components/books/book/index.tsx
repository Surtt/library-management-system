import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { borrowBookThunk } from '@/features/books/booksSlice';
import { userBorrowBookThunk } from '@/features/users/usersSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IBook } from '@/types';

const Book = ({ ISBN, title, image, status }: IBook) => {
  const dispatch = useAppDispatch();
  const { books, users } = useAppSelector((state) => state);
  const currentBook = books.list.find((book) => book.ISBN === ISBN) as IBook;
  const navigate = useNavigate();

  const handleBorrowBook = () => {
    if (!users.user) {
      navigate('/login');
    }
    if (currentBook) {
      dispatch(borrowBookThunk({ id: currentBook.id, userId: users.user?.id }));
      dispatch(userBorrowBookThunk(currentBook.id));
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
        <Button
          onClick={handleBorrowBook}
          variant="outlined"
          color="inherit"
          fullWidth
          disabled={!status}
        >
          {status ? 'Borrow' : 'Not available'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Book;
