import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import Author from '@/components/authors/author';
import AddAuthorForm from '@/components/forms/add-author-form';
import { useAppSelector } from '@/hooks/useAppSelector';

const AuthorsPage = () => {
  const { authors } = useAppSelector((state) => state);
  const [openAuthorForm, setOpenAuthorForm] = useState(false);

  const handleClickOpenAuthorForm = () => {
    setOpenAuthorForm(true);
  };

  const handleCloseAuthorForm = () => {
    setOpenAuthorForm(false);
  };
  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
      <>
        <Button sx={{ width: '50%' }} variant="contained" onClick={handleClickOpenAuthorForm}>
          Add an author
        </Button>
        <AddAuthorForm open={openAuthorForm} handleClose={handleCloseAuthorForm} />
      </>
      <Box sx={{ display: 'flex', columnGap: 4, rowGap: 4, flexWrap: 'wrap' }}>
        {authors.list.map((author) => (
          <Author key={author.id} {...author} />
        ))}
      </Box>
    </Box>
  );
};

export default AuthorsPage;
