import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import Dialog from '@/components/dialog';
import EditAuthorForm from '@/components/forms/edit-author-form';
import { deleteAuthorThunk } from '@/features/authors/authorsSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IAuthor } from '@/types';

const Author = ({ id, name }: IAuthor) => {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const currentAuthor = authors.list.find((author) => author.id === id) as IAuthor;

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleEditAuthor = () => {
    if (currentAuthor) {
      handleClickOpenForm();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAuthor = () => {
    if (currentAuthor) {
      dispatch(deleteAuthorThunk(currentAuthor.id));
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
        <EditAuthorForm
          currentAuthor={currentAuthor}
          open={openForm}
          handleClose={handleCloseForm}
        />
        <Button onClick={handleClickOpen} variant="outlined" color="inherit" fullWidth>
          Delete
        </Button>
        <Dialog
          title={name}
          open={open}
          handleClose={handleClose}
          handleDeleteBook={handleDeleteAuthor}
        />
      </CardActions>
    </Card>
  );
};

export default Author;
