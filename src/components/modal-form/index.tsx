import React, { useEffect } from 'react';
import { Box, Modal, useTheme } from '@mui/material';
import { UseMutateFunction } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import FormInput from '@/components/form-input/FormInput';
import LoadingButton from '@/components/loading-button';
import { IAuthor, ICategory } from '@/types';

type FormInputData = {
  name: string;
  label: string;
};

type ModalFormProps = {
  open: boolean;
  handleClose: () => void;
  isLoading: boolean;
  mutate: UseMutateFunction<IAuthor | ICategory, unknown, { name: string }>;
  methods: UseFormReturn<{ name: string }>;
  formInputData: FormInputData[];
  textButton: string;
};

const ModalForm = ({
  methods,
  open,
  handleClose,
  isLoading,
  mutate,
  textButton,
  formInputData,
}: ModalFormProps) => {
  const theme = useTheme();

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

  const onSubmitHandler: SubmitHandler<{ name: string }> = (values) => {
    mutate(values);
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

export default ModalForm;
