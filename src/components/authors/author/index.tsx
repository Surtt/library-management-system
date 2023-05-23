import React, { useState } from 'react';
import { Card, CardActions, CardContent, Typography } from '@mui/material';

import Dialog from '@/components/dialog';
import { IAuthor } from '@/types';

const Author = ({ id, name }: IAuthor) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card key={id} sx={{ minWidth: 270 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Dialog title={name} open={open} handleClose={handleClose} />
      </CardActions>
    </Card>
  );
};

export default Author;
