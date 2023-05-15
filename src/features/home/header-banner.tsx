import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import libraryHeader from '@/assets/images/library-header.png';

const HeaderBanner = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginBottom: 15,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: theme.palette.secondary.light,
        width: '100%',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box
          component="h3"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3,
            width: '50%',
            color: theme.palette.common.white,
            fontSize: theme.typography.h3,
            fontWeight: theme.typography.fontWeightBold,
          }}
        >
          Library Management System
          <Typography color={theme.palette.common.white} fontSize={34} lineHeight={1.1} width="80%">
            Books for learning programming and computer science
          </Typography>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              width: '50%',
              backgroundColor: theme.palette.secondary.dark,
              fontWeight: 700,
              '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.common.white,
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
        <Box
          component="img"
          src={libraryHeader}
          sx={{
            width: 400,
          }}
        />
      </Container>
    </Box>
  );
};

export default HeaderBanner;
