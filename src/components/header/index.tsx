import React from 'react';
import { Box, Container, Grid, useTheme } from '@mui/material';

import Logo from '@/components/logo';
import Navigation from '@/components/navigation';

const Header = () => {
  const theme = useTheme();
  return (
    <Grid sx={{ backgroundColor: theme.palette.primary.light }} container>
      <Container maxWidth="lg">
        <Box
          component="header"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          <Logo />
          <Navigation />
        </Box>
      </Container>
    </Grid>
  );
};

export default Header;
