import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  useTheme,
} from '@mui/material';

import useDebounce from '@/hooks/useDebounce';
import { useBooks } from '@/queries/useBooks';

const Search = () => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);
  const [books] = useBooks({ debouncedSearch });
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchedData = () => {
    if (debouncedSearch) {
      return books.filter((book) =>
        book.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    } else {
      return [];
    }
  };
  return (
    <Box sx={{ position: 'relative' }}>
      <TextField
        onChange={handleSearch}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: theme.palette.secondary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.secondary.light,
            },
          },
          '& fieldset': {
            borderRadius: 50,
          },
          width: 500,
        }}
        id="outlined-search"
        type="search"
        placeholder="Title, author or ISBN"
        variant="outlined"
        margin="dense"
        InputLabelProps={{
          shrink: false,
        }}
      />
      {debouncedSearch && (
        <List
          sx={{
            position: 'absolute',
            width: '100%',
            backgroundColor: theme.palette.common.white,
            boxShadow: theme.shadows,
          }}
        >
          {searchedData()
            .slice(0, 10)
            .map((book) => (
              <ListItem key={book.id}>
                <ListItemButton>
                  <ListItemText>{book.title}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
    </Box>
  );
};

export default Search;
