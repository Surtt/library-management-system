import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

type MenuItemProps = {
  name: string;
  to: string;
};

const CustomMenuItem = ({ name, to }: MenuItemProps) => {
  const theme = useTheme();
  return (
    <Box component="li">
      <Box
        component={Link}
        to={to}
        sx={{
          display: 'block',
          paddingTop: 2,
          paddingBottom: 2,
          color: theme.palette.grey['800'],
          fontWeight: 700,
          '&:hover': {
            color: theme.palette.grey['600'],
          },
        }}
      >
        {name}
      </Box>
    </Box>
  );
};

export default CustomMenuItem;
