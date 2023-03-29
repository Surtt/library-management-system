import React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout';
import AuthorsPage from '@/pages/authors.page';
import BooksPage from '@/pages/books.page';
import DashboardPage from '@/pages/dashboard.page';
import HomePage from '@/pages/home.page';
import LoginPage from '@/pages/login.page';
import ProfilePage from '@/pages/profile.page';

import './App.css';

const App = () => {
  return (
    <CssVarsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="dashboard/*" element={<DashboardPage />}>
            <Route path="books" element={<BooksPage />} />
            <Route path="authors" element={<AuthorsPage />} />
          </Route>

          {/*<Route path="*" element={<NoMatch />} />*/}
        </Route>
      </Routes>
    </CssVarsProvider>
  );
};

export default App;
