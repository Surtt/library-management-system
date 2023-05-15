import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';

const Layout = () => {
  const theme = useTheme();
  return (
    <Grid container sx={{ flexDirection: 'column' }}>
      <Header />
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.common.white,
        }}
      >
        <Loading />
        <Outlet />
      </Box>

      <Footer />
    </Grid>
  );
};

export default Layout;
