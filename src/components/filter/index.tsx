import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { IAuthor, IBookFilter } from '@/types';

type TFilter = {
  filters: IBookFilter;
  setFilter: Dispatch<SetStateAction<IBookFilter>>;
  authors: IAuthor[];
};

const Filter = ({ filters, setFilter, authors }: TFilter) => {
  const handleChangeAvailable = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFilter({
      ...filters,
      author: event.target.value,
    });
  };
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={filters.available}
            onChange={handleChangeAvailable}
            inputProps={{ 'aria-label': 'status' }}
            name="available"
          />
        }
        label="Available"
      />
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="author-label">Author</InputLabel>
        <Select
          sx={{ width: 300 }}
          labelId="author-label"
          id="author"
          value={filters.author}
          onChange={handleChangeSelect}
          fullWidth
          label="Author"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {authors.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
