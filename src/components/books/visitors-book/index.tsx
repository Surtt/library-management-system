import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { useReturnBook } from '@/features/checkout/useReturnBook';
import { ICheckout } from '@/types/checkout';

const VisitorsBook = (checkout: ICheckout) => {
  const {
    bookCopy: { book },
  } = checkout;

  const { mutate } = useReturnBook(checkout.id);
  const handleReturnBook = () => {
    mutate({ bookCopyId: checkout.bookCopy.id, userId: checkout.user.id });
  };

  return (
    <Card sx={{ width: 250, display: 'flex', flexDirection: 'column' }}>
      <CardMedia sx={{ height: 250 }} image={book.image} title={book.title} />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="h3">
          {book.title}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button onClick={handleReturnBook} variant="outlined" color="inherit" fullWidth>
          Return
        </Button>
      </CardActions>
    </Card>
  );
};

export default VisitorsBook;
