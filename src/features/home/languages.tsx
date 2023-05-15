import React from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { Box, Container, Theme } from '@mui/material';

import List from '@/features/home/list';

const firstColumn = [
  {
    icon: (theme: Theme) => (
      <ArrowForwardIos sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'JavaScript',
  },
  {
    icon: (theme: Theme) => (
      <ArrowForwardIos sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'TypeScript',
  },
];

const secondColumn = [
  {
    icon: (theme: Theme) => (
      <ArrowForwardIos sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Node.js',
  },
  {
    icon: (theme: Theme) => (
      <ArrowForwardIos sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'React',
  },
];

const thirdColumn = [
  {
    icon: (theme: Theme) => (
      <ArrowForwardIos sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Tanstack Query',
  },
  {
    icon: (theme: Theme) => (
      <ArrowForwardIos sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Next.js',
  },
];

const Languages = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: 15 }}>
      <Box marginBottom={15}>
        <Box component="h3" fontSize={30} textAlign="center" marginBottom={5}>
          Popular topics
        </Box>
        <List firstColumn={firstColumn} secondColumn={secondColumn} thirdColumn={thirdColumn} />
      </Box>
    </Container>
  );
};

export default Languages;
