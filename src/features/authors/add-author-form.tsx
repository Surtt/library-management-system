import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

import ModalForm from '@/components/modal-form';
import { useAddAuthor } from '@/features/authors/queries/useAddAuthor';

type FormAuthorProps = {
  open: boolean;
  handleClose: () => void;
};

const formInputData = [
  {
    name: 'name',
    label: 'Name',
  },
];

const addAuthorSchema = object({
  name: string().min(1, 'Name is required').max(300),
});

export type AddAuthorInput = TypeOf<typeof addAuthorSchema>;

const AddAuthorForm = ({ open, handleClose }: FormAuthorProps) => {
  const methods = useForm<AddAuthorInput>({
    resolver: zodResolver(addAuthorSchema),
  });

  const { mutate: addAuthor, isLoading } = useAddAuthor();

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      mutate={addAuthor}
      isLoading={isLoading}
      methods={methods}
      formInputData={formInputData}
      textButton="Add an author"
    />
  );
};

export default AddAuthorForm;
