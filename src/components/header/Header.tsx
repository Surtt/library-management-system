import React from 'react';
import { Container, Grid } from '@mui/material';

import Logo from '@/components/logo/Logo';
import Navigation from '@/components/navigation/Navigation';

import styles from './Header.module.css';

const Header = () => {
  return (
    <Grid className={styles.headerContainer} container>
      <Container maxWidth="lg">
        <header className={styles.header}>
          <Logo />
          <Navigation />
        </header>
      </Container>
    </Grid>
  );
};

export default Header;
