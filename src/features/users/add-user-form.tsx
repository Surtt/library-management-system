import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

import ModalUserForm from '@/features/users/modal-user-form';
import { useAddUser } from '@/features/users/queries/use-add-user';

type FormAuthorProps = {
  open: boolean;
  handleClose: () => void;
};

const formInputData = [
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },
  {
    name: 'email',
    label: 'Email',
  },
  {
    name: 'password',
    label: 'Password',
  },
];

const addUserSchema = object({
  firstName: string().min(1, 'Name is required').max(300),
  lastName: string().min(1, 'Name is required').max(300),
  email: string().email({ message: 'Invalid email address' }),
  password: string().min(7, { message: 'Password should be more than 7 symbols' }),
});

export type AddUserInput = TypeOf<typeof addUserSchema>;

const AddUserForm = ({ open, handleClose }: FormAuthorProps) => {
  const methods = useForm<AddUserInput>({
    resolver: zodResolver(addUserSchema),
  });

  const { mutate: addUser, isLoading } = useAddUser();

  return (
    <ModalUserForm
      open={open}
      handleClose={handleClose}
      mutate={addUser}
      isLoading={isLoading}
      methods={methods}
      formInputData={formInputData}
      textButton="Add a user"
    />
  );
};

export default AddUserForm;
