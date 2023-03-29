import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useAppSelector';

const DashboardPage = () => {
  const { users } = useAppSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.user) {
      navigate('/login');
    }
    if (users.user?.role && users.user?.role !== 'admin') {
      navigate('/');
    }
  }, [users.user]);

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box component="section">
      <Box sx={{ display: 'flex', flex: '1 1 100%' }}>
        <Box sx={{ flexBasis: '20%', display: 'flex', flexDirection: 'column' }}>
          <Button sx={{ marginBottom: 5 }} onClick={handleBack}>
            Back
          </Button>
          <Link to="books">Books</Link>
          <Link to="authors">Authors</Link>
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
