import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

import ModalBookForm from '@/features/books/modal-book-form';
import { useAddBook } from '@/features/books/queries/use-add-book';

type FormBookProps = {
  open: boolean;
  handleClose: () => void;
};

const formInputData = [
  {
    name: 'isbn',
    label: 'ISBN',
  },
  {
    name: 'title',
    label: 'Title',
  },
  {
    name: 'description',
    label: 'Description',
  },
  {
    name: 'image',
    label: 'Image',
  },
  {
    name: 'publisher',
    label: 'Publisher',
  },
  {
    name: 'publishedDate',
    label: 'Published Date',
  },
];

const addBookSchema = object({
  isbn: string().min(10, 'ISBN is required').max(17),
  title: string().min(1, 'Title is required').max(300),
  description: string().min(10, 'Description is required').max(300),
  image: string().min(10, 'Image is required').max(300),
  publisher: string().min(1, 'Publisher is required').max(100),
  publishedDate: string().min(8, 'Published date is required').max(100),
  categoryId: string().min(1, 'Category is required').max(300),
  authorId: string().min(1, 'Authors is required').max(300),
});

export type AddBookInput = TypeOf<typeof addBookSchema>;

const AddBookForm = ({ open, handleClose }: FormBookProps) => {
  const methods = useForm<AddBookInput>({
    resolver: zodResolver(addBookSchema),
  });

  const { mutate: addBook, isLoading } = useAddBook();

  return (
    <ModalBookForm
      open={open}
      handleClose={handleClose}
      mutate={addBook}
      isLoading={isLoading}
      methods={methods}
      formInputData={formInputData}
      textButton="Add a book"
    />
  );
};

export default AddBookForm;
