import React, { useEffect } from 'react';

import Books from '@/components/books';
import Filter from '@/components/filter';
import { getAuthorsThunk } from '@/features/authors/authorsSlice';
import { getCategoriesThunk } from '@/features/categories/categoriesSlice';
import { useAppDispatch } from '@/hooks';

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthorsThunk());
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      <Filter />
      <Books />
    </>
  );
};

export default HomePage;
