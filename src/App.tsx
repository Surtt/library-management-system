import React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import routes from './router';

import './App.css';

const App = () => {
  const content = useRoutes(routes);
  return (
    <CssVarsProvider>
      <ToastContainer />
      {/*<Routes>*/}
      {/*  <Route path="/" element={<Layout />}>*/}
      {/*    <Route index element={<HomePage />} />*/}
      {/*    <Route path="signup" element={<SignUpPage />} />*/}
      {/*    <Route path="signin" element={<SignInPage />} />*/}
      {/*    <Route path="profile" element={<ProfilePage />} />*/}
      {/*    <Route path="dashboard/*" element={<DashboardPage />}>*/}
      {/*      <Route path="books" element={<BooksPage />} />*/}
      {/*      <Route path="authors" element={<AuthorsPage />} />*/}
      {/*    </Route>*/}
      {/*    <Route path="*" element={<NoMatchPage />} />*/}
      {/*  </Route>*/}
      {/*</Routes>*/}
      {content}
    </CssVarsProvider>
  );
};

export default App;
