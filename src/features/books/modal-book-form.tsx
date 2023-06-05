import React, { useEffect } from 'react';
import { Box, FormControl, MenuItem, Modal, Select, Typography, useTheme } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';
import { Controller, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import FormInput from '@/components/form-input/FormInput';
import LoadingButton from '@/components/loading-button';
import { useAuthors } from '@/features/authors/queries/use-authors';
import { AddBookInput } from '@/features/books/Add-book-form';
import { useCategories } from '@/features/categories/queries/use-categories';
import { IBook } from '@/types';

type FormInputData = {
  name: string;
  label: string;
};

type ModalFormProps = {
  open: boolean;
  handleClose: () => void;
  isLoading: boolean;
  mutate: UseMutateFunction<IBook, unknown, IBook>;
  methods: UseFormReturn<{
    isbn: string;
    title: string;
    description: string;
    image: string;
    publisher: string;
    publishedDate: string;
    categoryId: string;
    authorId: string;
  }>;
  formInputData: FormInputData[];
  textButton: string;
};

const ModalBookForm = ({
  methods,
  open,
  handleClose,
  isLoading,
  mutate,
  textButton,
  formInputData,
}: ModalFormProps) => {
  const theme = useTheme();
  const { data: categories = [] } = useCategories();
  const { data: authors = [] } = useAuthors();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<AddBookInput> = (values) => {
    const splitDate = values.publishedDate.split('.');
    const data: IBook = {
      ...values,
      publishedDate: `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`,
    };
    mutate(data);
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
            <FormInput key={name} name={name} label={label} />
          ))}
          <Controller
            defaultValue=""
            name="categoryId"
            render={({ field }) => (
              <FormControl sx={{ minWidth: 120, mb: 2 }} fullWidth>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.secondary.light, mb: 1, fontWeight: 500 }}
                >
                  Category
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
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            // control={control}
            defaultValue=""
            name="authorId"
            render={({ field }) => (
              <FormControl sx={{ minWidth: 120, mb: 2 }} fullWidth>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.secondary.light, mb: 1, fontWeight: 500 }}
                >
                  Author
                </Typography>
                <Select
                  {...field}
                  sx={{
                    borderRadius: '1rem',
                    backgroundColor: theme.palette.common.white,
                  }}
                  // error={!!errors['category']}
                  // value={age}
                  // onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {authors.map((author) => (
                    <MenuItem key={author.id} value={author.id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
                {/*<FormHelperText error={!!errors['category']}>*/}
                {/*  {errors['category'] ? errors['category'].message : ''}*/}
                {/*</FormHelperText>*/}
              </FormControl>
            )}
          />
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

export default ModalBookForm;
