import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 'auto',
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: theme.palette.secondary.light,
        width: '100%',
      }}
    >
      <Container maxWidth="xl">
        <Typography color={theme.palette.common.white}>YLibrary &copy;</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
