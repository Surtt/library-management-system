import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

import FullScreenLoader from '../components/full-screen-loader';
import { useStateContext } from '../context';
import { getMe } from '../features/auth/get-me';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);
  const stateContext = useStateContext();

  const query = useQuery(['authUser'], () => getMe(), {
    enabled: !!cookies.logged_in,
    select: (data) => data,
    onSuccess: (data) => {
      stateContext.dispatch({ type: 'SET_USER', payload: data });
    },
  });

  if (query.isLoading && cookies.logged_in) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
