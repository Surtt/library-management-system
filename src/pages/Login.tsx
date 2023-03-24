import React from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';

import { IUser, useUser } from '@/components/layout/Layout';

const Login = () => {
  const { setUser } = useUser();
  const [, setCookie] = useCookies(['logged_in']);

  return (
    <div>
      <p>Login</p>
      <GoogleLogin
        auto_select
        onSuccess={(credentialResponse: CredentialResponse) => {
          const credential = credentialResponse.credential;
          if (typeof credential === 'string') {
            const decode: IUser = jwtDecode(credential);
            setUser({ name: decode.name, email: decode.email });
          }
          setCookie('logged_in', credential, { path: '/', maxAge: 360000 });

          toast.success('Success', { position: 'top-right' });
          return <ToastContainer />;
        }}
        onError={() => {
          // console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default Login;
