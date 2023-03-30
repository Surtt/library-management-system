import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const NoMatchPage = () => {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: 'center', rowGap: 4, display: 'flex', flexDirection: 'column' }}>
      <Box component="h2">Oops, something went wrong</Box>
      <Link to="/">
        <Typography
          color={theme.palette.grey['800']}
          fontWeight={700}
          sx={{ textDecoration: 'underline' }}
        >
          Home
        </Typography>
      </Link>
    </Box>
  );
};

export default NoMatchPage;
