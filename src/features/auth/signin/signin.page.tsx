import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { object, string, TypeOf } from 'zod';

import FormInput from '@/components/form-input/FormInput';
import LinkItem from '@/components/link-item';
import LoadingButton from '@/components/loading-button';
import { useStateContext } from '@/context';
import { getMe } from '@/features/auth/get-me';
import { signInUser } from '@/features/auth/signin/signin-user';
import { queryErrorHandler, querySuccessHandler } from '@/queries/query-client';

const loginSchema = object({
  email: string().min(1, 'Email address is required').email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(7, 'Password must be more than 7 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const SignInPage = () => {
  const theme = useTheme();
  const [, setCookie] = useCookies(['logged_in']);
  const navigate = useNavigate();
  const location = useLocation();

  const stateContext = useStateContext();
  const user = stateContext.state.authUser;

  const from = (location.state as string) || '/';

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      return navigate('/');
    }
  }, [user]);

  const query = useQuery(['authUser'], getMe, {
    enabled: false,
    select: (data) => data,
    retry: 1,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => signInUser(userData),
    {
      onSuccess: async (data) => {
        setCookie('logged_in', data.token, { path: '/', maxAge: 36000 });
        await query.refetch();
        querySuccessHandler('You successfully logged in');
        navigate(from);
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
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    loginUser(values);
  };

  return (
    <>
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
              fontWeight: 600,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 2,
              letterSpacing: 1,
            }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            sx={{ color: theme.palette.common.white, mb: 2 }}
          >
            Login to have access!
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
              <FormInput name="email" label="Email Address" type="email" />
              <FormInput name="password" label="Password" type="password" />

              <Typography sx={{ fontSize: '0.9rem', mb: '1rem', textAlign: 'right' }}>
                <LinkItem to="/" style={{ color: '#333' }}>
                  Forgot Password?
                </LinkItem>
              </Typography>

              <LoadingButton
                variant="contained"
                sx={{ mt: 1 }}
                fullWidth
                disableElevation
                type="submit"
                loading={isLoading}
              >
                Sign In
              </LoadingButton>

              <Typography sx={{ fontSize: '0.9rem', mt: '1rem' }}>
                Need an account? <LinkItem to="/signup">Sign Up Here</LinkItem>
              </Typography>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </>
  );
};

export default SignInPage;
