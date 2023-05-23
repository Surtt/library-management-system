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

import AddAuthorForm from '@/features/authors/add-author-form';
import { useAuthors } from '@/features/authors/queries/useAuthors';
import { useDeleteAuthor } from '@/features/authors/queries/useDeleteAuthor';
import { useUpdateAuthor } from '@/features/authors/queries/useUpdateAuthor';

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
        + Add author
      </ButtonComp>
      <AddAuthorForm open={openAddForm} handleClose={handleCloseAddForm} />
    </GridToolbarContainer>
  );
};

const AuthorsAdminTable = () => {
  const theme = useTheme();
  const { data: authors = [] } = useAuthors();
  const { mutate: updateAuthor } = useUpdateAuthor();
  const { mutate: deleteAuthor } = useDeleteAuthor();
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

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteAuthor(id as string);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };

    const newData = {
      name: newRow.name,
    };

    const authorId = newRow.id;
    updateAuthor({ authorId, newData });
    return updatedRow;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 350 },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      editable: true,
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
        width: '100%',
      }}
    >
      <Box style={{ height: 'auto', width: '100%' }}>
        <DataGrid
          rows={authors}
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

export default AuthorsAdminTable;
