import React, { ChangeEvent, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateBookThunk } from '@/features/books/booksSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IBook } from '@/types';
import { validationBookSchema } from '@/utils';

type ValidationSchema = z.infer<typeof validationBookSchema>;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type FormBookProps = {
  currentBook: IBook;
  open: boolean;
  handleClose: () => void;
};

const EditBookForm = ({ currentBook, open, handleClose }: FormBookProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { authors, categories } = useAppSelector((state) => state);
  const [book, setBook] = useState<IBook>({
    borrowDate: currentBook.borrowDate,
    borrowerId: currentBook.borrowerId,
    id: currentBook.id,
    image: currentBook.image,
    publishedDate: currentBook.publishedDate,
    returnDate: currentBook.returnDate,
    status: currentBook.status,
    ISBN: currentBook.ISBN,
    title: currentBook.title,
    description: currentBook.description,
    publisher: currentBook.publisher,
    authors: currentBook.authors,
    categories: currentBook.categories,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationBookSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = () => {
    dispatch(updateBookThunk({ ...book }));
    handleClose();
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeSelectAuthors = (e: SelectChangeEvent) => {
    setBook({
      ...book,
      authors: e.target.value,
    });
  };

  const handleChangeSelectCategories = (e: SelectChangeEvent<typeof book.categories>) => {
    const {
      target: { value },
    } = e;
    setBook({
      ...book,
      categories: typeof value === 'string' ? value.split(',') : value,
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
          {...register('ISBN')}
          value={book.ISBN}
          onChange={handleInput}
          id="ISBN"
          label="ISBN"
          variant="outlined"
        />
        {errors.ISBN && errors.ISBN.message}
        <TextField
          {...register('title')}
          value={book.title}
          onChange={handleInput}
          id="title"
          label="title"
          variant="outlined"
        />
        {errors.title && errors.title.message}
        <TextField
          {...register('description')}
          value={book.description}
          onChange={handleInput}
          id="description"
          label="description"
          variant="outlined"
        />
        {errors.description && errors.description.message}
        <TextField
          {...register('publisher')}
          value={book.publisher}
          onChange={handleInput}
          id="publisher"
          label="publisher"
          variant="outlined"
        />
        {errors.publisher && errors.publisher.message}
        <FormControl>
          <InputLabel id="author-label">Author</InputLabel>
          <Select
            {...register('authors')}
            labelId="author-label"
            id="author"
            value={book.authors}
            onChange={handleChangeSelectAuthors}
            fullWidth
            label="Author"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {authors.list.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.authors && errors.authors.message}
        <FormControl>
          <InputLabel id="categories-label">Category</InputLabel>
          <Select
            {...register('categories')}
            labelId="categories-label"
            id="categories"
            multiple
            value={book.categories}
            onChange={handleChangeSelectCategories}
            // input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            fullWidth
            label="Category"
          >
            {categories.list.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                <Checkbox value={id} checked={book.categories.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.categories && errors.categories.message}

        <Button type="submit" variant="contained" size="large">
          Edit a book
        </Button>
      </Box>
    </Modal>
  );
};

export default EditBookForm;
