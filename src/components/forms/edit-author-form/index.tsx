import React, { ChangeEvent, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Modal, TextField, useTheme } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateAuthorThunk } from '@/features/authors/authorsSlice';
import { useAppDispatch } from '@/hooks';
import { IAuthor } from '@/types';

const validationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

type FormBookProps = {
  currentAuthor: IAuthor;
  open: boolean;
  handleClose: () => void;
};

const EditAuthorForm = ({ currentAuthor, open, handleClose }: FormBookProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [author, setAuthor] = useState<IAuthor>(currentAuthor);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = () => {
    dispatch(updateAuthorThunk(author));
    handleClose();
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor({
      ...author,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          width: '50%',
          margin: 'auto',
          padding: 4,
          backgroundColor: theme.palette.common.white,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        autoComplete="off"
      >
        <TextField
          {...register('name')}
          value={author.name}
          onChange={handleInput}
          id="name"
          label="name"
          variant="outlined"
        />
        {errors.name && errors.name.message}
        <Button type="submit" variant="contained" size="large">
          Update an author
        </Button>
      </Box>
    </Modal>
  );
};

export default EditAuthorForm;
