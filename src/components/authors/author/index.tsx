import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import Dialog from '@/components/dialog';
import { deleteBookThunk } from '@/features/books/booksSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IAuthor } from '@/types';

const Author = ({ id, name }: IAuthor) => {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state);
  const [open, setOpen] = useState(false);

  const currentBook = authors.list.find((author) => author.id === id);

  const handleEditAuthor = () => {
    // dispatch()
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteBook = () => {
    if (currentBook) {
      dispatch(deleteBookThunk(currentBook.id));
    }
  };
  return (
    <Card key={id} sx={{ minWidth: 270 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button onClick={handleEditAuthor} variant="outlined" color="inherit" fullWidth>
          Edit
        </Button>
        <Button onClick={handleClickOpen} variant="outlined" color="inherit" fullWidth>
          Delete
        </Button>
        <Dialog
          title={name}
          open={open}
          handleClose={handleClose}
          handleDeleteBook={handleDeleteBook}
        />
      </CardActions>
    </Card>
  );
};

export default Author;
