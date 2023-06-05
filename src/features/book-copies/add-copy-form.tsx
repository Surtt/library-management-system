import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

import ModalBookCopyForm from '@/features/book-copies/modal-book-copy-form';
import { useAddBookCopy } from '@/features/book-copies/queries/use-add-book-copy';

type FormBookProps = {
  open: boolean;
  handleClose: () => void;
};

const formInputData = [
  {
    name: 'book',
    label: 'Book',
  },
];

const addCopySchema = object({
  book: string().uuid(),
});

export type AddCopyInput = TypeOf<typeof addCopySchema>;

const AddCopyForm = ({ open, handleClose }: FormBookProps) => {
  const methods = useForm<AddCopyInput>({
    resolver: zodResolver(addCopySchema),
  });

  const { mutate: addBookCopy, isLoading } = useAddBookCopy();

  return (
    <ModalBookCopyForm
      open={open}
      handleClose={handleClose}
      mutate={addBookCopy}
      isLoading={isLoading}
      methods={methods}
      formInputData={formInputData}
      textButton="Add a book copy"
    />
  );
};

export default AddCopyForm;
