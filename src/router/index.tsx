import { FC, lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import AdminLayout from '@/components/admin-layout';
import MainLayout from '@/components/main-layout';
import LoginPage from '@/features/auth/signin/signIn.page';
import BooksPage from '@/features/books/books.page';
import HomePage from '@/features/home/home.page';
import BooksAdminPage from '@/pages/books.admin.page';
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
      index: true,
      element: <HomePage />,
    },
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
  element: <MainLayout />,
  children: [
    {
      path: 'books',
      element: <BooksPage />,
      children: [
        {
          path: ':category',
          element: <BooksPage />,
        },
      ],
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
      path: 'unauthorized',
      element: <UnauthorizedPage />,
    },
  ],
};

const adminRoutes: RouteObject = {
  path: '*',
  element: <AdminLayout />,
  children: [
    {
      path: 'dashboard',
      element: <RequireUser allowedRoles={['ROLE_ADMIN']} />,
      children: [
        {
          path: '',
          element: <DashboardPage />,
          children: [
            {
              path: 'books',
              element: <BooksAdminPage />,
            },
          ],
        },
      ],
    },
  ],
};

const routes: RouteObject[] = [authRoutes, adminRoutes, normalRoutes];

export default routes;
