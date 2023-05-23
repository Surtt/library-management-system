import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminMenuItem = ({ name }: { name: string }) => {
  const theme = useTheme();
  return (
    <Box component="li">
      <Box
        sx={{
          display: 'block',
          padding: 1.5,
          width: 300,
          color: theme.palette.grey['800'],
          '&:hover': {
            transition: 'all 0.4s',
            transform: 'translate(10px)',
            color: theme.palette.common.white,
            opacity: 0.8,
            backgroundColor: theme.palette.secondary.light,
          },
        }}
        component={Link}
        to={`/dashboard/${name.toLowerCase()}`}
      >
        {name}
      </Box>
    </Box>
  );
};

export default AdminMenuItem;
