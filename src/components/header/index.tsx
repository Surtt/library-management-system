import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  useTheme,
} from '@mui/material';

import Logo from '@/components/logo';
import Navigation from '@/components/navigation';
import useDebounce from '@/hooks/useDebounce';
import { useBooks } from '@/queries/useBooks';

const Header = () => {
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
    <Grid container>
      <Container maxWidth="lg">
        <Box
          component="header"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          <Logo />
          <Box sx={{ position: 'relative' }}>
            <TextField
              onChange={handleSearch}
              sx={{
                width: 300,
                backgroundColor: theme.palette.common.white,
                borderRadius: 2,
                '& input': { padding: 2 },
                '& fieldset': { borderRadius: 2 },
              }}
              id="outlined-search"
              label="Search field"
              type="search"
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
                    <ListItem key={book.ISBN}>
                      <ListItemButton>
                        <ListItemText>{book.title}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            )}
          </Box>
          <Navigation />
        </Box>
      </Container>
    </Grid>
  );
};

export default Header;
