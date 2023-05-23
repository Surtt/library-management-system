import React from 'react';

import Advantages from '@/features/home/advantages';
import HeaderBanner from '@/features/home/header-banner';
import Languages from '@/features/home/languages';
import Statistics from '@/features/home/statistics';

const HomePage = () => {
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
