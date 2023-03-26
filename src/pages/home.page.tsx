import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';

import Books from '@/components/books';
import Filter from '@/components/filter';
import { useAuthors } from '@/queries/useAuthors';
import { IBookFilter } from '@/types';

const HomePage = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState<IBookFilter>({
    available: false,
    author: '',
    publishedDate: '',
  });
  const [authors] = useAuthors();
  return (
    <Box
      component="main"
      sx={{
        marginTop: 6,
        padding: 2.5,
        backgroundColor: theme.palette.common.white,
        borderRadius: 2,
      }}
    >
      <Filter filters={filters} setFilter={setFilters} authors={authors} />
      <Books filters={filters} />
    </Box>
  );
};

export default HomePage;
