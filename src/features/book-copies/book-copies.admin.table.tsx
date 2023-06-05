import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box, Button as ButtonComp, useTheme } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowModesModel,
  GridRowParams,
  GridToolbarContainer,
  MuiEvent,
} from '@mui/x-data-grid';

import AddCopyForm from '@/features/book-copies/add-copy-form';
import { useBookCopies } from '@/features/book-copies/queries/use-book-copies';
import { useDeleteBookCopy } from '@/features/book-copies/queries/use-delete-book-copy';

const EditToolbar = () => {
  const theme = useTheme();
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleClickOpenAddForm = () => {
    setOpenAddForm(true);
  };

  const handleCloseAddForm = () => {
    setOpenAddForm(false);
  };

  return (
    <GridToolbarContainer>
      <ButtonComp
        sx={{
          color: theme.palette.secondary.light,
          '&:hover': {
            color: theme.palette.secondary.main,
            backgroundColor: 'transparent',
          },
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: 'none',
          },
        }}
        variant="text"
        onClick={handleClickOpenAddForm}
      >
        + Add copy
      </ButtonComp>
      <AddCopyForm open={openAddForm} handleClose={handleCloseAddForm} />
    </GridToolbarContainer>
  );
};

const BookCopiesAdminTable = () => {
  const theme = useTheme();
  const { data: bookCopies = [] } = useBookCopies();
  const { mutate: deleteBookCopy } = useDeleteBookCopy();

  const preparedBookCopies = bookCopies.map((copy) => ({
    id: copy.id,
    status: copy.status ? 'Available' : 'Not available',
    bookTitle: copy.book.title,
  }));
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteBookCopy(id as string);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 350 },
    {
      field: 'status',
      headerName: 'Status',
      width: 250,
    },
    {
      field: 'bookTitle',
      headerName: 'Book title',
      width: 250,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            sx={{
              '&:focus': {
                outline: 'none',
              },
              '&:focus-visible': {
                outline: 'none',
              },
            }}
            key={id}
            icon={
              <DeleteIcon
                sx={{
                  fill: theme.palette.secondary.light,
                }}
              />
            }
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
      }}
    >
      <Box style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={preparedBookCopies}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          // processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
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

export default BookCopiesAdminTable;
