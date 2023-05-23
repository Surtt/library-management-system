import React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { useLocation, useRoutes } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Modal from '@/components/modal';

import routes from './router';

import './App.css';

const App = () => {
  const location = useLocation();
  const previousLocation = location.state && location.state?.previousLocation;
  const content = useRoutes(routes, previousLocation || location);
  const [, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  return (
    <CssVarsProvider>
      <ToastContainer />
      {content}
      {previousLocation && (
        <Routes>
          <Route path="/books/:id" element={<Modal open={true} handleClose={handleClose} />} />
        </Routes>
      )}
    </CssVarsProvider>
  );
};

export default App;
