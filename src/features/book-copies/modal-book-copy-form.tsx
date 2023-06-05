import React, { useEffect } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Modal,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';
import { Controller, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import LoadingButton from '@/components/loading-button';
import { useBooks } from '@/features/books/queries/use-books';
import { IBookCopy } from '@/types/book-copy';

type FormInputData = {
  name: string;
  label: string;
};

type ModalFormProps = {
  open: boolean;
  handleClose: () => void;
  isLoading: boolean;
  mutate: UseMutateFunction<IBookCopy, unknown, { bookId: string }>;
  methods: UseFormReturn<{
    book: string;
  }>;
  formInputData: FormInputData[];
  textButton: string;
};

const ModalBookCopyForm = ({
  methods,
  open,
  handleClose,
  isLoading,
  mutate,
  textButton,
  formInputData,
}: ModalFormProps) => {
  const theme = useTheme();
  const { data: books = [] } = useBooks();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<{ book: string }> = (values) => {
    const book = { bookId: values.book };
    mutate(book);
    handleClose();
  };
  return (
    <FormProvider {...methods}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          component="form"
          sx={{
            maxHeight: '80%',
            overflowY: 'scroll',
            width: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: theme.palette.grey['200'],
            p: { xs: '1rem', sm: '2rem' },
            borderRadius: 2,
          }}
          autoComplete="off"
        >
          {formInputData.map(({ name, label }) => (
            <Controller
              key={name}
              // control={control}
              defaultValue=""
              name={name}
              render={({ field }) => (
                <FormControl sx={{ minWidth: 120, mb: 2 }} fullWidth>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.secondary.light, mb: 1, fontWeight: 500 }}
                  >
                    {label}
                  </Typography>
                  <Select
                    {...field}
                    fullWidth
                    sx={{ borderRadius: '1rem', backgroundColor: theme.palette.common.white }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {books.map((book) => (
                      <MenuItem key={book.id} value={book.id}>
                        {book.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={!!errors.book}>
                    {errors.book ? errors.book.message : ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          ))}

          <LoadingButton
            variant="contained"
            sx={{ mt: 1 }}
            fullWidth
            disableElevation
            type="submit"
            loading={isLoading}
          >
            {textButton}
          </LoadingButton>
        </Box>
      </Modal>
    </FormProvider>
  );
};

export default ModalBookCopyForm;
