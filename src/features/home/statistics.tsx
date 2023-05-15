import React from 'react';
import { AutoStories, EmojiEvents, Person, School } from '@mui/icons-material';
import { Box, Container, Theme, Typography, useTheme } from '@mui/material';

const statisticData = [
  {
    icon: (theme: Theme) => <AutoStories sx={{ fill: theme.palette.secondary.light }} />,
    number: '27 483',
    text: 'Books',
  },
  {
    icon: (theme: Theme) => <Person sx={{ fill: theme.palette.secondary.light }} />,
    number: '967 807',
    text: 'Readers',
  },
  {
    icon: (theme: Theme) => <School sx={{ fill: theme.palette.secondary.light }} />,
    number: '2 678',
    text: 'Universities',
  },
  {
    icon: (theme: Theme) => <EmojiEvents sx={{ fill: theme.palette.secondary.light }} />,
    number: '13',
    text: 'Years of successful work',
  },
];

const Statistics = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ marginBottom: 15 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
        {statisticData.map(({ icon, number, text }) => (
          <Box key={text} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {icon(theme)}
            <Typography fontSize={30}>{number}</Typography>
            <Typography fontSize={16}>{text}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Statistics;
