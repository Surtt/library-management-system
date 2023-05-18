import React from 'react';
import { Box, Container, useTheme } from '@mui/material';

import CustomMenuItem from '@/components/custom-menu-item';
import Search from '@/components/search';

const menuData = [
  {
    name: 'Books',
    to: '/books',
  },
  {
    name: 'Audiobooks',
    to: '/audiobooks',
  },
  {
    name: 'Magazines',
    to: '/magazines',
  },
];

const HeaderMainNav = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderTop: `1px solid ${theme.palette.grey.A400}`,
        borderBottom: `1px solid ${theme.palette.grey.A400}`,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box component="nav">
          <Box component="ul" sx={{ display: 'flex', columnGap: 5 }}>
            {menuData.map((menuItem) => (
              <CustomMenuItem key={menuItem.name} {...menuItem} />
            ))}
          </Box>
        </Box>
        <Search />
      </Container>
    </Box>
  );
};

export default HeaderMainNav;
