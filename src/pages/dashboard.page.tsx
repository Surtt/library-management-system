import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import ButtonBack from '@/components/button-back';

const DashboardPage = () => {
  const theme = useTheme();

  // useEffect(() => {
  //   if (!users.user) {
  //     navigate('/login');
  //   }
  //   if (users.user?.role && users.user?.role !== 'admin') {
  //     navigate('/');
  //   }
  // }, [users.user]);

  return (
    <Box component="section">
      <Box sx={{ display: 'flex', flex: '1 1 100%' }}>
        <Box sx={{ flexBasis: '20%', display: 'flex', flexDirection: 'column' }}>
          <ButtonBack />
          <Link to="books">
            <Typography color={theme.palette.grey['800']} sx={{ fontWeight: 700 }}>
              Books
            </Typography>
          </Link>
          <Link to="authors">
            <Typography color={theme.palette.grey['800']} sx={{ fontWeight: 700 }}>
              Authors
            </Typography>
          </Link>
        </Box>
        <Box sx={{ flexBasis: '80%' }}>
          <Box component="h3" sx={{ marginBottom: 4 }}>
            Dashboard
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
