import React, { useEffect } from 'react';

import { getAuthorsThunk } from '@/features/authors/authorsSlice';
import { getCategoriesThunk } from '@/features/categories/categoriesSlice';
import Advantages from '@/features/home/advantages';
import HeaderBanner from '@/features/home/header-banner';
import Languages from '@/features/home/languages';
import Statistics from '@/features/home/statistics';
import { useAppDispatch } from '@/hooks';

const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthorsThunk());
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  return (
    <>
      {/*<Filter />*/}

      <HeaderBanner />
      <Statistics />
      <Advantages />
      <Languages />
    </>
  );
};

export default HomePage;
