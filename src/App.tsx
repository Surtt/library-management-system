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
      {content}
    </CssVarsProvider>
  );
};

export default App;
