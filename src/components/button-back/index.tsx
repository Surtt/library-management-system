import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Link, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ButtonBack = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
      <KeyboardArrowLeftIcon sx={{ color: theme.palette.primary.main }} />
      <Link sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => navigate(-1)}>
        Back
      </Link>
    </Box>
  );
};

export default ButtonBack;
