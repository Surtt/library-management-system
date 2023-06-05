import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useCheckouts } from '@/features/checkout/queries/use-checkouts';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'isReturned', headerName: 'Is Returned', width: 100 },
  { field: 'borrowDate', headerName: 'Borrow Date', width: 150 },
  { field: 'returnDate', headerName: 'Return Date', width: 150 },
  { field: 'book', headerName: 'Book', width: 250 },
  { field: 'email', headerName: 'User email', width: 250 },
];

const CheckoutsAdminTable = () => {
  const { data: checkouts = [] } = useCheckouts();

  const formatDate = new Intl.DateTimeFormat();
  const formattedCheckouts = checkouts.map((checkout) => ({
    ...checkout,
    borrowDate: formatDate.format(new Date(checkout.borrowDate)),
    returnDate: formatDate.format(new Date(checkout.returnDate as Date)),
    book: checkout.bookCopy.book.title,
    email: checkout.user.email,
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
        overflowX: 'scroll',
      }}
    >
      <Box sx={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={formattedCheckouts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </Box>
  );
};

export default CheckoutsAdminTable;
