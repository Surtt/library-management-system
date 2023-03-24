import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Outlet, useOutletContext } from 'react-router-dom';

import Header from '@/components/header/Header';
import Loading from '@/components/loading/Loading';

export interface IUser {
  name: string;
  email: string;
}

type ContextType = { user: IUser | null; setUser: (arg: IUser) => void };

const Layout = () => {
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Loading />
        <Outlet context={{ user, setUser }} />
      </Container>
    </>
  );
};

export function useUser() {
  return useOutletContext<ContextType>();
}

export default Layout;
