import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';

import ModalForm from '@/components/modal-form';
import { useAddCategory } from '@/features/categories/queries/useAddCategory';

type FormCategoryProps = {
  open: boolean;
  handleClose: () => void;
};

const formInputData = [
  {
    name: 'name',
    label: 'Name',
  },
];

const addCategorySchema = object({
  name: string().min(1, 'Name is required').max(300),
});

export type AddCategoryInput = TypeOf<typeof addCategorySchema>;

const AddCategoryForm = ({ open, handleClose }: FormCategoryProps) => {
  const methods = useForm<AddCategoryInput>({
    resolver: zodResolver(addCategorySchema),
  });

  const { mutate: addCategory, isLoading } = useAddCategory();

  return (
    <ModalForm
      open={open}
      handleClose={handleClose}
      mutate={addCategory}
      isLoading={isLoading}
      methods={methods}
      formInputData={formInputData}
      textButton="Add a category"
    />
  );
};

export default AddCategoryForm;
