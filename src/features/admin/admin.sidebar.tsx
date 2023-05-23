import React from 'react';
import { Box, useTheme } from '@mui/material';

import AdminMenuItem from '@/features/admin/admin.menu-item';

const sidebarItems = [
  {
    name: 'Checkouts',
    to: '/checkouts',
  },
  {
    name: 'Books',
    to: '/books',
  },
  {
    name: 'Authors',
    to: '/authors',
  },
  {
    name: 'Categories',
    to: '/categories',
  },
  {
    name: 'Users',
    to: '/users',
  },
  {
    name: 'Roles',
    to: '/roles',
  },
];

const AdminSidebar = () => {
  const theme = useTheme();
  return (
    <Box
      component="ul"
      sx={{ minWidth: 315, borderRight: `1px solid ${theme.palette.grey['200']}` }}
    >
      {sidebarItems.map((item) => (
        <AdminMenuItem key={item.name} {...item} />
      ))}
    </Box>
  );
};

export default AdminSidebar;
