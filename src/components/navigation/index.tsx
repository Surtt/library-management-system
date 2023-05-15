import React, { useState } from 'react';
import { Logout } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import CustomMenuItem from '@/components/custom-menu-item';
import { useStateContext } from '@/context';
import { logoutUser } from '@/features/users/usersSlice';
import { useAppDispatch } from '@/hooks';

const menuData = [
  {
    name: 'Sign in',
    to: '/signin',
  },
  {
    name: 'Sign up',
    to: '/signup',
  },
];

const Navigation = () => {
  const user = useStateContext().state.authUser;
  const dispatch = useAppDispatch();
  const stateContext = useStateContext();
  const nameAvatar = typeof user?.firstName === 'string' && user.firstName.slice(0, 1);
  const [, , removeCookie] = useCookies(['logged_in']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCookie('logged_in', {
      path: '/',
      domain: 'localhost',
    });
    stateContext.dispatch({
      type: 'SET_USER',
      payload: null,
    });
    dispatch(logoutUser());
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
        {user && (
          <Box component="ul" sx={{ display: 'flex', columnGap: 5 }}>
            <CustomMenuItem name="My Books" to="/profile" />
          </Box>
        )}
        {!user && (
          <Box component="ul" sx={{ display: 'flex', columnGap: 5 }}>
            {menuData.map((menuItem) => (
              <CustomMenuItem key={menuItem.name} {...menuItem} />
            ))}
          </Box>
        )}
        {user && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 38, height: 38 }}>{nameAvatar}</Avatar>
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              backgroundColor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user?.roles?.find((r) => r.name === 'ROLE_ADMIN') ? (
          <Link to="/dashboard">
            <MenuItem onClick={handleClose}>
              <Avatar /> Dashboard
            </MenuItem>
          </Link>
        ) : (
          <Link to="/profile">
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
          </Link>
        )}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navigation;
