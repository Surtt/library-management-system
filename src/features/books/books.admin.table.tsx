import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button as ButtonComp, useTheme } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridToolbarContainer,
  MuiEvent,
} from '@mui/x-data-grid';

import AddBookForm from '@/features/books/Add-book-form';
import { useBooks } from '@/features/books/queries/use-books';
import { useDeleteBook } from '@/features/books/queries/use-delete-book';
import { useUpdateBook } from '@/features/books/queries/use-update-book';
import { useCategories } from '@/features/categories/queries/use-categories';

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
        + Add book
      </ButtonComp>
      <AddBookForm open={openAddForm} handleClose={handleCloseAddForm} />
    </GridToolbarContainer>
  );
};

const BooksAdminTable = () => {
  const theme = useTheme();
  const { data: books = [] } = useBooks();
  const { data: categories = [] } = useCategories();
  // const { data: authors = [] } = useAuthors();
  const { mutate } = useDeleteBook();
  const { mutate: updateBook } = useUpdateBook();

  const updatedCategories = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // const updatedAuthors = authors.map((author) => ({
  //   value: author.id,
  //   label: author.name,
  // }));
  const formatDate = new Intl.DateTimeFormat('eu-EU');
  const formattedBooks = books.map((book) => ({
    ...book,
    status: book.status ? 'Available' : 'Not Available',
    publishedDate: formatDate.format(new Date(book.publishedDate)),
    // category: categories.map((category) => ({ value: category.id, label: category.name })),
    authors: book.authors?.map((author) => author.id),
  }));

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    mutate(id as string);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };

    const splitDate = newRow.publishedDate.split('.');
    const newData = {
      isbn: newRow.isbn,
      title: newRow.title,
      description: newRow.description,
      image: newRow.image,
      publisher: newRow.publisher,
      publishedDate: `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`,
      categoryId: newRow.category,
      authorId: newRow.authors[0],
    };

    const bookId = newRow.id;
    updateBook({ bookId, newData });
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 350 },
    { field: 'isbn', headerName: 'ISBN', width: 150, editable: true },
    { field: 'title', headerName: 'Title', width: 250, editable: true },
    { field: 'description', headerName: 'Description', width: 250, editable: true },
    { field: 'image', headerName: 'Image', width: 250, editable: true },
    { field: 'publisher', headerName: 'Publisher', width: 200, editable: true },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'publishedDate',
      headerName: 'Published Date',
      width: 150,
      // type: 'date',
      // valueGetter: ({ value }) => formatDate.format(value) && new Date(value),
      editable: true,
    },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      type: 'singleSelect',
      valueOptions: updatedCategories,
      editable: true,
    },
    {
      field: 'authors',
      headerName: 'Authors',
      width: 250,
      // type: 'singleSelect',
      // valueOptions: updatedAuthors,
      // editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
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
                <SaveIcon
                  sx={{
                    fill: theme.palette.secondary.light,
                  }}
                />
              }
              label="Save"
              onClick={handleSaveClick(id)}
            />,
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
                <CancelIcon
                  sx={{
                    fill: theme.palette.secondary.light,
                  }}
                />
              }
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

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
              <EditIcon
                sx={{
                  fill: theme.palette.secondary.light,
                }}
              />
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
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
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
        overflowX: 'scroll',
      }}
    >
      <Box style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={formattedBooks}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
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

export default BooksAdminTable;
