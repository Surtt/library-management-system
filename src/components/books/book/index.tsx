import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { IBook } from '@/types';

const Book = ({ title, image, status }: IBook) => {
  return (
    <Card sx={{ width: 175, display: 'flex', flexDirection: 'column' }}>
      <CardMedia sx={{ height: 250 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="h3">
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button variant="outlined" color="inherit" fullWidth disabled={status !== 'available'}>
          {status === 'available' ? 'Borrow' : 'Not available'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Book;
