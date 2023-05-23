import React from 'react';
import { Box, Container, Grid, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from '@/components/loading';
import AdminSidebar from '@/features/admin/admin.sidebar';

const AdminLayout = () => {
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
          <AdminSidebar />
          <Loading />
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Grid>
  );
};

export default AdminLayout;
