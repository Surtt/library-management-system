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
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { addBookThunk } from '@/features/books/booksSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TAddBook } from '@/types';

const validationSchema = z.object({
  ISBN: z.string().length(11, { message: 'ISBN must be 11 characters long' }),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  publisher: z.string().min(1, { message: 'Publisher is required' }),
  authors: z.string().min(1, { message: 'Authors is required' }),
  categories: z.string().array().min(1, { message: 'Categories is required' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

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

const AddBookPage = () => {
  const dispatch = useAppDispatch();
  const { authors, categories } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [book, setBook] = useState<TAddBook>({
    ISBN: '',
    title: '',
    description: '',
    publisher: '',
    authors: '',
    categories: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = () => {
    dispatch(addBookThunk({ ...book }));
    navigate('/');
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

  // const handleSubmitForm = (e: FormEvent<HTMLFormElement>, book: TAddBook) => {
  //   e.preventDefault();
  //   dispatch(addBook({ ...book }));
  //   navigate('/');
  // };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box component="section">
      <Button onClick={handleBack} sx={{ marginBottom: 4 }}>
        Back
      </Button>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '50%', margin: 'auto' }}
        autoComplete="off"
      >
        <TextField
          {...register('ISBN')}
          onChange={handleInput}
          id="ISBN"
          label="ISBN"
          variant="outlined"
        />
        {errors.ISBN && errors.ISBN.message}
        <TextField
          {...register('title')}
          onChange={handleInput}
          id="title"
          label="title"
          variant="outlined"
        />
        {errors.title && errors.title.message}
        <TextField
          {...register('description')}
          onChange={handleInput}
          id="description"
          label="description"
          variant="outlined"
        />
        {errors.description && errors.description.message}
        <TextField
          {...register('publisher')}
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
            {/*<MenuItem value="">*/}
            {/*  <em>None</em>*/}
            {/*</MenuItem>*/}
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
          Add a book
        </Button>
      </Box>
    </Box>
  );
};

export default AddBookPage;
