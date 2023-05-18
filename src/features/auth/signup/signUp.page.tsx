import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string, TypeOf } from 'zod';

import FormInput from '@/components/form-input/FormInput';
import LinkItem from '@/components/link-item';
import LoadingButton from '@/components/loading-button';
import { useStateContext } from '@/context';
import { signUpUser } from '@/features/auth/signup/signUpUser';
import { queryErrorHandler, querySuccessHandler } from '@/queries/queryClient';

const registerSchema = object({
  firstName: string().min(1, 'First name is required').max(100),
  lastName: string().min(1, 'Last name is required').max(100),
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(7, 'Password must be more than 7 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const SignUpPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useStateContext().state.authUser;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate: registerUser, isLoading } = useMutation(
    (userData: RegisterInput) => signUpUser(userData),
    {
      onSuccess: async () => {
        querySuccessHandler('You successfully signed up');
        navigate('/');
      },
      onError: (error: Error) => {
        queryErrorHandler(error);
      },
    },
  );

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (user) {
      return navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          sx={{
            color: theme.palette.common.white,
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 600,
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome to YLibrary!
        </Typography>
        <Typography component="h2" sx={{ color: theme.palette.common.white, mb: 2 }}>
          Sign Up To Get Started!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            maxWidth="27rem"
            width="100%"
            sx={{
              backgroundColor: theme.palette.grey['200'],
              p: { xs: '1rem', sm: '2rem' },
              borderRadius: 2,
            }}
          >
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput name="password" label="Password" type="password" />
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Already have an account? <LinkItem to="/signin">Sign in Here</LinkItem>
            </Typography>

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Sign Up
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignUpPage;
