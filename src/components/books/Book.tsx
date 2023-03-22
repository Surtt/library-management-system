import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import { IBook } from '../../types';

const Book = ({ title, description, image }: IBook) => {
  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h3">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Book;
