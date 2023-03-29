import React from 'react';
import { Button, Dialog as DialogComp, DialogActions, DialogTitle } from '@mui/material';

type DialogProps = {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleDeleteBook: () => void;
};

const Dialog = ({ title, open, handleClose, handleDeleteBook }: DialogProps) => {
  return (
    <DialogComp
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
    </DialogComp>
  );
};

export default Dialog;
