import React from 'react';
import { Box, useTheme } from '@mui/material';

import CategoryItem from '@/features/categories/category-item';
import { useCategories } from '@/features/categories/queries/useCategories';
import { ICategory } from '@/types';

const Sidebar = () => {
  const theme = useTheme();
  const { data: categories } = useCategories();
  const sortCategories = (a: ICategory, b: ICategory) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };
  return (
    <Box>
      <Box
        component="ul"
        sx={{ width: 315, borderRight: `1px solid ${theme.palette.grey['200']}` }}
      >
        {categories?.sort(sortCategories).map((category) => (
          <CategoryItem key={category.id} {...category} />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
