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
import { Link, useLocation } from 'react-router-dom';

import { useBooks } from '@/features/books/queries/useBooks';
import useDebounce from '@/hooks/useDebounce';

const Search = () => {
  const theme = useTheme();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 400);
  const { data: books = [] } = useBooks();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchedData = () => {
    if (debouncedSearch) {
      const foundBook = books.filter((book) => {
        const title = book.title.toLowerCase();
        const isbn = book.isbn;
        const author = book.authors?.map((author) => author.name.toLowerCase()).join();
        const debounce = debouncedSearch.toLowerCase();

        if (title.includes(debounce)) {
          return book.title;
        }
        if (isbn.includes(debounce)) {
          return book.isbn;
        }
        if (author?.includes(debounce)) {
          return author;
        }
      });

      return foundBook;
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
                  <Link to={`/books/${book.id}`} state={{ previousLocation: location }}>
                    <ListItemText
                      sx={{
                        color: theme.palette.grey['800'],
                      }}
                    >
                      {book.title}
                    </ListItemText>
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
    </Box>
  );
};

export default Search;
