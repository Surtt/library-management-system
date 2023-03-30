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
  Typography,
  useTheme,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import { useStateContext } from '@/context';
import { logoutUser } from '@/features/users/usersSlice';
import { useAppDispatch } from '@/hooks';
import { useAppSelector } from '@/hooks/useAppSelector';

const Navigation = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state);
  const stateContext = useStateContext();
  const nameAvatar = typeof users.user?.firstName === 'string' && users.user.firstName.slice(0, 1);
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
        <Link to="/profile">
          <Typography color={theme.palette.grey['800']} sx={{ fontWeight: 700 }}>
            My Books
          </Typography>
        </Link>
        <Link to="/login">
          <Typography color={theme.palette.grey['800']} sx={{ fontWeight: 700 }}>
            {!users?.user && 'Log In'}
          </Typography>
        </Link>
        {users.user && (
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
        {users.user?.role === 'admin' ? (
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
