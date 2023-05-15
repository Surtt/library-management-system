import { FC, lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import LoginPage from '@/features/auth/signin/signIn.page';
import HomePage from '@/features/home/home.page';
import DashboardPage from '@/pages/dashboard.page';

import FullScreenLoader from '../components/full-screen-loader';
import Layout from '../components/layout';
import ProfilePage from '../pages/profile.page';
import RequireUser from '../pages/requireUser.page';

// eslint-disable-next-line react/display-name
const Loadable = (Component: FC) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<FullScreenLoader />}>
      <Component {...props} />
    </Suspense>
  );

const RegisterPage = Loadable(lazy(() => import('@/features/auth/signup/signUp.page')));
const UnauthorizedPage = Loadable(lazy(() => import('../pages/unauthorized.page')));

const authRoutes: RouteObject = {
  path: '*',
  element: <Layout />,
  children: [
    {
      path: 'signin',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <RegisterPage />,
    },
  ],
};

const normalRoutes: RouteObject = {
  path: '*',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: 'profile',
      element: <RequireUser allowedRoles={['ROLE_READER']} />,
      children: [
        {
          path: '',
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: 'dashboard',
      element: <RequireUser allowedRoles={['ROLE_ADMIN']} />,
      children: [
        {
          path: '',
          element: <DashboardPage />,
        },
      ],
    },
    {
      path: 'unauthorized',
      element: <UnauthorizedPage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
