import React from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStateContext } from '@/context';
import { IUser } from '@/types';

const LoginPage = () => {
  const [, setCookie] = useCookies(['logged_in']);
  const stateContext = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state?.from.pathname as string) || '/';
  return (
    <div>
      <p>Login</p>
      <GoogleLogin
        auto_select
        onSuccess={(credentialResponse: CredentialResponse) => {
          const credential = credentialResponse.credential;
          if (typeof credential === 'string') {
            const decode: IUser = jwtDecode(credential);
            stateContext.dispatch({
              type: 'SET_USER',
              payload: { name: decode.name, email: decode.email },
            });
          }
          setCookie('logged_in', credential, { path: '/', maxAge: 360000 });
          navigate(from);
        }}
        onError={() => {
          // console.log('LoginPage Failed');
        }}
      />
    </div>
  );
};

export default LoginPage;
