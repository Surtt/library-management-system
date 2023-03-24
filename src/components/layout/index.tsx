import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from '@/components/header';
import Loading from '@/components/loading';

const Layout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Loading />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
