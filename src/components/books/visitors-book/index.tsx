import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import Dialog from '@/components/dialog';
import EditBookForm from '@/components/forms/edit-book-form';
import { deleteBookThunk, returnBookThunk } from '@/features/books/booksSlice';
import { userReturnBookThunk } from '@/features/users/usersSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IBook } from '@/types';
import { Role } from '@/types/role';

const VisitorsBook = ({ ISBN, title, image, status }: IBook) => {
  const dispatch = useAppDispatch();
  const { books, users } = useAppSelector((state) => state);
  const currentBook = books.list.find((book) => book.ISBN === ISBN) as IBook;
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReturnBook = () => {
    if (currentBook) {
      dispatch(returnBookThunk(currentBook.id));
      dispatch(userReturnBookThunk(currentBook.id));
    }
  };
  const handleEditBook = () => {
    if (currentBook) {
      handleClickOpenForm();
    }
  };
  const handleDeleteBook = () => {
    if (currentBook) {
      dispatch(deleteBookThunk(currentBook.id));
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
        {users.user?.role === Role.ADMIN ? (
          <>
            <Button onClick={handleEditBook} variant="outlined" color="inherit" fullWidth>
              Edit
            </Button>
            <EditBookForm currentBook={currentBook} open={openForm} handleClose={handleCloseForm} />
            <Button onClick={handleClickOpen} variant="outlined" color="inherit" fullWidth>
              Delete
            </Button>
            <Dialog
              title={title}
              open={open}
              handleClose={handleClose}
              handleDeleteBook={handleDeleteBook}
            />
          </>
        ) : (
          <Button onClick={handleReturnBook} variant="outlined" color="inherit" fullWidth>
            {status === 'borrowed' && 'Return'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default VisitorsBook;
