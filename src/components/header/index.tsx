import { Box, Container } from '@mui/material';

import HeaderMainNav from '@/components/header/header-main-nav';
import Logo from '@/components/logo';
const Header = () => {
  return (
    <>
      <Box component="header">
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 3,
            paddingBottom: 3,
          }}
        >
          <Logo />

          <Navigation />
        </Container>
      </Box>
      <HeaderMainNav />
    </>
  );
};

import Navigation from '@/components/navigation';

export default Header;
