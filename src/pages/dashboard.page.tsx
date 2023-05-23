import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import AuthorsAdminTable from '@/features/authors/authors.admin.table';
import BookCopiesAdminTable from '@/features/book-copies/book-copies.admin.table';
import BooksAdminTable from '@/features/books/books.admin.table';
import CategoriesAdminTable from '@/features/categories/categories.admin.table';
import CheckoutsAdminTable from '@/features/checkout/checkouts.admin.table';

const DashboardPage = () => {
  const { category } = useParams();

  switch (category) {
    case 'authors':
      return <AuthorsAdminTable />;
    case 'categories':
      return <CategoriesAdminTable />;
    case 'checkouts':
      return <CheckoutsAdminTable />;
    case 'books':
      return <BooksAdminTable />;
    case 'book-copies':
      return <BookCopiesAdminTable />;
    default:
      return <div>dashboard</div>;
  }

  return (
    <Box component="section">
      <Box sx={{ display: 'flex', flex: '1 1 100%' }}>
        <Box sx={{ flexBasis: '20%', display: 'flex', flexDirection: 'column' }}></Box>
        <Box sx={{ flexBasis: '80%' }}>
          <Box component="h3" sx={{ marginBottom: 4 }}>
            Dashboard
          </Box>
          {/*<Outlet />*/}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
