import React from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo-2.png';

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
