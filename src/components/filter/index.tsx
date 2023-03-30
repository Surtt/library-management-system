import React, { ChangeEvent, useEffect, useState } from 'react';
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

import { setFilterAction } from '@/features/filters/filtersSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IBookFilter } from '@/types';

const Filter = () => {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state);
  const [filters, setFilters] = useState<IBookFilter>({
    available: false,
    author: '',
  });
  const handleChangeAvailable = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFilters({
      ...filters,
      author: event.target.value,
    });
  };

  useEffect(() => {
    dispatch(setFilterAction(filters));
  }, [filters, dispatch]);

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
          {authors.list.map(({ id, name }) => (
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
