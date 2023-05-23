import React from 'react';
import { Box, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AdminMenuItem = ({ name, to }: { name: string; to: string }) => {
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
        component={NavLink}
        to={`/dashboard/${to.toLowerCase()}`}
        style={({ isActive }) => {
          return {
            fontWeight: isActive ? 'bold' : '',
            color: isActive ? theme.palette.common.white : '',
            opacity: isActive ? 0.8 : '',
            backgroundColor: isActive ? theme.palette.secondary.light : '',
            transition: isActive ? 'all 0.4s' : '',
            transform: isActive ? 'translate(0)' : '',
          };
        }}
      >
        {name}
      </Box>
    </Box>
  );
};

export default AdminMenuItem;
