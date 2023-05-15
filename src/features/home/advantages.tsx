import React from 'react';
import { AutoStories } from '@mui/icons-material';
import { Box, Container, Theme } from '@mui/material';

import List from '@/features/home/list';

const firstColumn = [
  {
    icon: (theme: Theme) => (
      <AutoStories sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Modern content',
  },
  {
    icon: (theme: Theme) => (
      <AutoStories sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Interactive services',
  },
];

const secondColumn = [
  {
    icon: (theme: Theme) => (
      <AutoStories sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Easy access from any device',
  },
  {
    icon: (theme: Theme) => (
      <AutoStories sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Literature selection service',
  },
];

const thirdColumn = [
  {
    icon: (theme: Theme) => (
      <AutoStories sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Simple and convenient personal account',
  },
  {
    icon: (theme: Theme) => (
      <AutoStories sx={{ fill: theme.palette.secondary.light, fontSize: 15 }} />
    ),
    text: 'Technical support',
  },
];

const Advantages = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: 15 }}>
      <Box component="h3" fontSize={30} textAlign="center" marginBottom={5}>
        Discover the advantages of the electronic library system
      </Box>
      <List firstColumn={firstColumn} secondColumn={secondColumn} thirdColumn={thirdColumn} />
    </Container>
  );
};

export default Advantages;
