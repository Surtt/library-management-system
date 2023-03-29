import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material';

import { deleteBookThunk, returnBookThunk } from '@/features/books/booksSlice';
import { userReturnBookThunk } from '@/features/users/usersSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IBook } from '@/types';

const VisitorsBook = ({ ISBN, title, image, status }: IBook) => {
  const dispatch = useAppDispatch();
  const { books, users } = useAppSelector((state) => state);
  const currentBook = books.list.find((book) => book.ISBN === ISBN) as IBook;
  const [open, setOpen] = React.useState(false);

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
      dispatch(returnBookThunk(currentBook.id));
      dispatch(userReturnBookThunk(currentBook.id));
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
        {users.user?.role === 'admin' ? (
          <>
            <Button onClick={handleEditBook} variant="outlined" color="inherit" fullWidth>
              Edit
            </Button>
            <Button onClick={handleClickOpen} variant="outlined" color="inherit" fullWidth>
              Delete
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {`Do you really want to delete the book "${title}"?`}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleDeleteBook}>Delete</Button>
                <Button onClick={handleClose} autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
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
