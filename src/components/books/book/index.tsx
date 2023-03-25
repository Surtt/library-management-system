import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import { IBook } from '@/types';

const Book = ({ title, image }: IBook) => {
  return (
    <Card sx={{ width: 175 }}>
      <CardMedia sx={{ height: 250 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="h3">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Book;
