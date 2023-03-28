import React from 'react';
import { Box } from '@mui/material';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useStateContext } from '@/context';
import { addUserThunk } from '@/features/users/usersSlice';
import { useAppDispatch } from '@/hooks';

type DecodeType = {
  given_name: string;
  family_name: string;
  email: string;
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [, setCookie] = useCookies(['logged_in']);
  const stateContext = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state?.from.pathname as string) || '/';
  return (
    <div>
      <Box component="h3">Log In</Box>
      <GoogleLogin
        auto_select
        onSuccess={(credentialResponse: CredentialResponse) => {
          const credential = credentialResponse.credential;
          if (typeof credential === 'string') {
            const decode: DecodeType = jwtDecode(credential);
            const user = {
              firstName: decode.given_name,
              lastName: decode.family_name,
              email: decode.email,
            };
            stateContext.dispatch({
              type: 'SET_USER',
              payload: user,
            });
            dispatch(addUserThunk(user));
            toast.success('Success', { position: 'top-right' });
          }
          setCookie('logged_in', credential, { path: '/', maxAge: 360000 });
          navigate(from);
        }}
        onError={() => {
          toast.error('Something went wrong!', { position: 'top-right' });
        }}
      />
    </div>
  );
};

export default LoginPage;
