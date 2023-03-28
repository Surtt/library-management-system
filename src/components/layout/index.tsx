import React from 'react';
import { Box, Container, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from '@/components/header';
import Loading from '@/components/loading';

const Layout = () => {
  const theme = useTheme();
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box
          component="main"
          sx={{
            marginTop: 6,
            padding: 2.5,
            backgroundColor: theme.palette.common.white,
            borderRadius: 2,
            border: `1px solid ${theme.palette.grey['400']}`,
          }}
        >
          <Loading />
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
