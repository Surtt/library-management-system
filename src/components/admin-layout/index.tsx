import React from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';

const AdminLayout = () => {
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
        <div>admin sidebar</div>
        <Loading />
        <Outlet />
      </Box>

      <Footer />
    </Grid>
  );
};

export default AdminLayout;
