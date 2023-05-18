import React from 'react';
import { Box, Container, Grid, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';
import Sidebar from '@/features/categories/sidebar';

const MainLayout = () => {
  const theme = useTheme();
  return (
    <Grid container sx={{ flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="xl">
        <Box
          component="main"
          sx={{
            display: 'flex',
            marginTop: 10,
            marginBottom: 10,
            columnGap: 5,
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Sidebar />
          <Loading />
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Grid>
  );
};

export default MainLayout;
